import { useState, useEffect } from 'react';

import { ObjectChangeCallback } from 'realm';

import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { mapById } from '@/utils/getMapById';

import useMutableValue from '../useMutableValue';

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
      setAudioRecording(audioRecording);
      setAudioRecordingVersion(audioRecordingVersionRef.current + 1);
      let propsToWatchMap: { [props: string]: boolean } = {};

      if (propsToWatch) {
        propsToWatchMap = mapById.toExists(propsToWatch);
      }

      const listener: ObjectChangeCallback<AudioRecordingSchema> = (
        nextaudioRecording,
        { changedProperties, deleted },
      ) => {
        let isAnythingChanged = !!changedProperties.length;

        if (propsToWatch) {
          isAnythingChanged = changedProperties.some((changedProp) => propsToWatchMap[changedProp]);
        }

        if (isAnythingChanged) {
          setAudioRecordingVersion(audioRecordingVersionRef.current + 1);
          setAudioRecording(nextaudioRecording);
        }
      };

      AudioRecordingsDB.performAfterTransactionComplete(() =>
        audioRecording.addListener(listener as ObjectChangeCallback<unknown>),
      );

      return () => {
        audioRecording.removeListener(listener as ObjectChangeCallback<unknown>);
      };
    }
  }, [audioRecordingId]);

  return [audioRecording, audioRecordingVersion];
}
