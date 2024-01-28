import { AudioRecordingSchema } from '../schema/audioRecordings/AudioRecordingSchema';
import { ZRKRealmConfiguration } from '../types';

export const audioRecordingsConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [AudioRecordingSchema],
  schemaVersion: 1,
};
