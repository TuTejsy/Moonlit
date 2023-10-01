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
      const formattedAudioRecordings: Array<AudioRecordingSchema> = audioRecordings.map(
        (audioRecording) => {
          const { createdAtTimestamp, updatedAtTimestamp } = audioRecording;

          const createdDate = new Date(createdAtTimestamp);
          const updatedDate = new Date(updatedAtTimestamp);

          return {
            audioURL: audioRecording.audioURL,
            createdAtTimestamp: createdDate.getTime(),
            duration: audioRecording.duration,
            id: audioRecording.id,
            isFree: audioRecording.is_free,
            name: audioRecording.name,
            size: audioRecording.size,
            storyId: audioRecording.story_id,
            updatedAtTimestamp: updatedDate.getTime(),
            voiceCoverUrl: audioRecording.voice_cover_url,
          };
        },
      );

      const [upserted, notUpserted] = await AudioRecordingsDB.upsert(formattedAudioRecordings);

      if (notUpserted.length) {
        notUpserted.forEach(({ err }) => console.error(err));
      }
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
