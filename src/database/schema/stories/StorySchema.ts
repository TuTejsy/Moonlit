import { ObjectSchema } from 'realm';

export const StorySchema: ObjectSchema = {
  name: 'Story',
  primaryKey: 'id',
  properties: {
    author: 'string',
    category_ids: 'int[]',
    description: 'string',
    full_cover_url: 'string',
    id: 'int',
    is_free: 'bool',
    name: 'string',
    preview_cover_url: 'string',
    revision: 'int',
    type: 'int',
  },
};
