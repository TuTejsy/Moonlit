import { ZRKRealmConfiguration } from 'realm';

import { AudioRecordingSchema } from '../schema/audioRecordings/AudioRecordingSchema';

export const audioRecordingsConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [AudioRecordingSchema],
  schemaVersion: 1,
};
