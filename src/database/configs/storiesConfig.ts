import { ColorSchema } from '../schema/stories/ColorSchema';
import { StorySchema } from '../schema/stories/StorySchema';
import { ZRKRealmConfiguration } from '../types';

export const storiesConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [StorySchema, ColorSchema],
  schemaVersion: 2,
};
