import { ColorSchema } from '../schema/stories/ColorSchema';
import { StorySchema } from '../schema/stories/StorySchema';
import { ZRKRealmConfiguration } from '../types';

export const storiesConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: false,

  schema: [StorySchema, ColorSchema],
  schemaVersion: 3,
};
