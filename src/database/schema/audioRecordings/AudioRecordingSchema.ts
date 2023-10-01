import { ObjectSchema } from 'realm';

export const AudioRecordingSchema: ObjectSchema = {
  name: 'AudioRecording',
  primaryKey: 'id',
  properties: {
    audioURL: 'string',
    createdAtTimestamp: 'int',
    duration: 'float',
    id: 'int',
    isFree: 'bool',
    name: 'string',
    size: 'int',
    storyId: 'int',
    updatedAtTimestamp: 'int',
    voiceCoverUrl: 'string',
  },
};
