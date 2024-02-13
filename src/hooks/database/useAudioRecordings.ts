import { useRef, useMemo, useState, useEffect } from 'react';

import Realm, { CollectionChangeCallback } from 'realm';

import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';

interface SortConfig {
  reverse: boolean;
  sortDescriptor: keyof AudioRecordingSchema;
}

const DEFAULT_SORT_CONFIG: SortConfig = {
  reverse: true,
  sortDescriptor: 'is_free',
};

export function useAudioRecordings(
  filter?: string,
  sortConfig?: SortConfig,
): [Realm.Results<AudioRecordingSchema>, number] {
  const audioRecordings = useMemo(() => {
    let result = AudioRecordingsDB.objects();

    if (filter) {
      result = result.filtered(filter);
    }

    const config = sortConfig ?? DEFAULT_SORT_CONFIG;

    result = result.sorted(config.sortDescriptor, config.reverse);

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const [audioRecordingsVersion, setaudioRecordingsVersion] = useState(0);
  const audioRecordingsVersionRef = useRef(audioRecordingsVersion);

  useEffect(() => {
    const listener: CollectionChangeCallback<AudioRecordingSchema> = (nextCollection) => {
      setaudioRecordingsVersion(++audioRecordingsVersionRef.current);
    };

    AudioRecordingsDB.performAfterTransactionComplete(() => audioRecordings.addListener(listener));

    return () => {
      audioRecordings.removeListener(listener);
    };
  }, [audioRecordings]);

  return [audioRecordings, audioRecordingsVersion];
}
