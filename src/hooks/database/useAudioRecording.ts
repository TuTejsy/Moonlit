import { useState, useEffect } from 'react';

import { ObjectChangeCallback } from 'realm';

import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { mapById } from '@/utils/getMapById';
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

        if (deleted) {
          setAudioRecordingVersion(audioRecordingVersionRef.current + 1);
          setAudioRecording(null);
        }
      };

      AudioRecordingsDB.performAfterTransactionComplete(() => audioRecording.addListener(listener));

      return () => {
        audioRecording.removeListener(listener);
      };
    }
  }, [audioRecordingId]);

  return [audioRecording, audioRecordingVersion];
}
