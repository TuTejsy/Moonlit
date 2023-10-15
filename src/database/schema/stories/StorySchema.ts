import { ObjectSchema } from 'realm';

export const StorySchema: ObjectSchema = {
  name: 'Story',
  primaryKey: 'id',
  properties: {
    author: 'string',
    category_ids: 'int[]',
    colors: 'ColorSchema?',
    created_at_timestamp: 'int',
    description: 'string',
    full_cover_url: 'string',
    id: 'int',
    is_favorite: {
      default: false,
      type: 'bool',
    },
    is_free: 'bool',
    medium_cover_url: 'string',
    name: 'string',
    played_at_timestamp: 'int?',
    played_count: 'int',
    revision: 'int',
    saved_at_timestamp: 'int?',
    selected_audio_recording_id: 'int?',
    small_cover_url: 'string',
    small_preview_cover_cached_name: 'string?',
    type: 'int',
    updated_at_timestamp: 'int',
  },
};
