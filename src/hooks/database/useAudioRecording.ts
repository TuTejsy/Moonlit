import { useState, useEffect } from 'react';

import { ObjectChangeCallback } from 'realm';

import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { cloneRealmObject } from '@/utils/realm/cloneRealmObject';

import { useMutableValue } from '../useMutableValue';

export function useAudioRecording(
  audioRecordingId: number | undefined,
  propsToWatch?: Array<keyof AudioRecordingSchema>,
): [AudioRecordingSchema | undefined | null, number] {
  const [audioRecording, setAudioRecording] = useState<AudioRecordingSchema | null>(
    audioRecordingId ? AudioRecordingsDB.object(audioRecordingId) : null,
  );

  const [audioRecordingVersion, setAudioRecordingVersion] = useState(0);
  const audioRecordingVersionRef = useMutableValue(audioRecordingVersion);

  useEffect(() => {
    if (!audioRecordingId) {
      return;
    }

    const audioRecording = AudioRecordingsDB.object(audioRecordingId);

    if (audioRecording) {
      setAudioRecording(cloneRealmObject(audioRecording));
      setAudioRecordingVersion(audioRecordingVersionRef.current + 1);

      const listener: ObjectChangeCallback<AudioRecordingSchema> = (
        nextaudioRecording,
        { changedProperties, deleted },
      ) => {
        const isAnythingChanged = !!changedProperties.length;

        if (isAnythingChanged) {
          setAudioRecordingVersion(audioRecordingVersionRef.current + 1);
          setAudioRecording(nextaudioRecording);
        }

        if (deleted) {
          setAudioRecordingVersion(audioRecordingVersionRef.current + 1);
          setAudioRecording(null);
        }
      };

      AudioRecordingsDB.performAfterTransactionComplete(() =>
        audioRecording.addListener(listener, propsToWatch),
      );

      return () => {
        audioRecording.removeListener(listener);
      };
    }
  }, [audioRecordingId]);

  return [audioRecording, audioRecordingVersion];
}
