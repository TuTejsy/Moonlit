import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { StoriesRepository } from '@/services/repositories/stories/stories';

export function useStoryAudioRecordingsUpdate(storyId: number): [boolean, () => void] {
  const [isLoading, setIsLoading] = useState(false);

  const updateAudioRecordings = useCallback(async () => {
    let error: AxiosError | null = null;

    try {
      setIsLoading(true);
      const audioRecordings = await StoriesRepository.getAudioRecordings(storyId);
      const formattedAudioRecordings: Array<AudioRecordingSchema> = [];
      const audioRecordingsIdsSet = new Set<number>();

      for (let i = 0; i < audioRecordings.length; i++) {
        const audioRecording = audioRecordings[i];

        const { created_at_timestamp, id, updated_at_timestamp } = audioRecording;

        const createdDate = new Date(created_at_timestamp);
        const updatedDate = new Date(updated_at_timestamp);

        const formattedAudioRecording = {
          audio_url: audioRecording.audio_url,
          cover_url: audioRecording.voices.cover_url,
          created_at_timestamp: createdDate.getTime(),
          duration: audioRecording.duration,
          id: audioRecording.id,
          is_free: audioRecording.voices.is_free,
          name: audioRecording.name,
          size: audioRecording.size,
          story_id: audioRecording.story_id,
          updated_at_timestamp: updatedDate.getTime(),
          voice_id: audioRecording.voices.id,
          voice_name: audioRecording.voices.name,
        };

        formattedAudioRecordings.push(formattedAudioRecording);
        audioRecordingsIdsSet.add(id);
      }

      const [_upserted, notUpserted] = await AudioRecordingsDB.upsert(formattedAudioRecordings);

      if (notUpserted.length) {
        notUpserted.forEach(({ err }) => console.error(err));
      }

      if (audioRecordings.length) {
        const audioRecordingIdsToRemove: Array<number> = [];
        const allAudioRecordings = AudioRecordingsDB.objects();

        for (let i = 0; i < allAudioRecordings.length; i++) {
          const audioRecording = allAudioRecordings[i];

          if (!audioRecordingsIdsSet.has(audioRecording.id)) {
            audioRecordingIdsToRemove.push(audioRecording.id);
          }
        }

        await AudioRecordingsDB.delete(audioRecordingIdsToRemove);
      }
    } catch (err) {
      console.error(err);
      error = err as AxiosError;
    } finally {
      setIsLoading(false);
    }

    return error;
  }, [storyId]);

  useEffect(() => {
    updateAudioRecordings().then((error) => {
      if (error) {
        updateAudioRecordings();
      }
    });
  }, []);

  return [isLoading, updateAudioRecordings];
}
