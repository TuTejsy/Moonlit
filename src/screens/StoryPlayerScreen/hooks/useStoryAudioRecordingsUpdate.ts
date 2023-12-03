import { useCallback, useEffect, useState } from 'react';

import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { StoriesRepository } from '@/services/repositories/stories/stories';

export function useStoryAudioRecordingsUpdate(storyId: number): [boolean, () => void] {
  const [isLoading, setIsLoading] = useState(false);

  const updateAudioRecordings = useCallback(async () => {
    try {
      setIsLoading(true);
      const audioRecordings = await StoriesRepository.getAudioRecordings(storyId);
      const formattedAudioRecordings: Array<AudioRecordingSchema> = [];
      const formattedAudioRecordingsSet = new Set<number>();

      audioRecordings.forEach((audioRecording) => {
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
        formattedAudioRecordingsSet.add(id);
      });

      const [_upserted, notUpserted] = await AudioRecordingsDB.upsert(formattedAudioRecordings);

      if (notUpserted.length) {
        notUpserted.forEach(({ err }) => console.error(err));
      }

      const audioRecordingsToDelete = AudioRecordingsDB.objects().filter(
        (audioRecording) => !formattedAudioRecordingsSet.has(audioRecording.id),
      );

      AudioRecordingsDB.delete(audioRecordingsToDelete);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [storyId]);

  useEffect(() => {
    updateAudioRecordings();
  }, []);

  return [isLoading, updateAudioRecordings];
}
