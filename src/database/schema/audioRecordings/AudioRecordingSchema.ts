import { ObjectSchema } from 'realm';

export const AudioRecordingSchema: ObjectSchema = {
  name: 'AudioRecording',
  primaryKey: 'id',
  properties: {
    audio_url: 'string',
    cached_name: 'string?',
    cover_url: 'string',
    created_at_timestamp: 'int',
    duration: 'float',
    id: 'int',
    is_free: 'bool',
    name: 'string',
    played_time: {
      default: 0,
      type: 'float',
    },
    size: 'int',
    story_id: 'int',
    updated_at_timestamp: 'int',
    voice_id: 'int',
    voice_name: 'string',
  },
};
