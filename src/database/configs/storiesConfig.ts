import { ZRKRealmConfiguration } from 'realm';

import { ColorSchema } from '../schema/stories/ColorSchema';
import { StorySchema } from '../schema/stories/StorySchema';

export const storiesConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [StorySchema, ColorSchema],
  schemaVersion: 2,
};
