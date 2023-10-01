import { ZRKRealmConfiguration } from 'realm';

import { AudioRecordingSchema } from '../schema/audioRecordings/AudioRecordingSchema';

const audioRecordingsConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [AudioRecordingSchema],
  schemaVersion: 1,
};

export default audioRecordingsConfig;
