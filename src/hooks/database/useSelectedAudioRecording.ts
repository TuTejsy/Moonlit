import { useCallback, useMemo, useRef } from 'react';

import { AudioRecordingsDB, StoriesDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { cloneRealmObject } from '@/utils/realm/cloneRealmObject';

import { useAudioRecordings } from './useAudioRecordings';
import { useStory } from './useStory';

export function useSelectedAudioRecording(storyId: number) {
  const [story, storyVersion] = useStory(storyId, ['selected_audio_recording_id']);
  const [audioRecordings, audioRecordingsVersion] = useAudioRecordings(`story_id = '${storyId}'`);

  const selectedAudioRecordingVersionRef = useRef(0);

  const [selectedAudioRecording, selectedAudioRecordingVersion] = useMemo(() => {
    let audioRecording: AudioRecordingSchema | null = null;

    const selectedAudioRecordingId = story?.selected_audio_recording_id;

    if (selectedAudioRecordingId) {
      audioRecording = AudioRecordingsDB.object(selectedAudioRecordingId);
    }

    const recordingToReturn = audioRecording || audioRecordings[0];

    selectedAudioRecordingVersionRef.current++;

    return [cloneRealmObject(recordingToReturn), selectedAudioRecordingVersionRef.current];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyVersion, audioRecordingsVersion]);

  const setSelectedAudioRecording = useCallback(
    (selectedAudioRecordingId: number) => {
      StoriesDB.modify(() => {
        if (story) {
          story.selected_audio_recording_id = selectedAudioRecordingId;
        }
      });
    },
    [story],
  );

  return {
    selectedAudioRecording,
    selectedAudioRecordingVersion,
    setSelectedAudioRecording,
  };
}
