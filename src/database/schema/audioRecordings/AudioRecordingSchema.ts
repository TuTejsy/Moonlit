import { ObjectSchema } from 'realm';

export const AudioRecordingSchema: ObjectSchema = {
  name: 'AudioRecording',
  primaryKey: 'id',
  properties: {
    audio_url: 'string',
    cover_url: 'string',
    created_at_timestamp: 'int',
    duration: 'float',
    id: 'int',
    is_free: 'bool',
    name: 'string',
    size: 'int',
    story_id: 'int',
    updated_at_timestamp: 'int',
    voice_id: 'int',
    voice_name: 'string',
  },
};
