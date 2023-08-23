import { ZRKRealmConfiguration } from 'realm';

import { ColorSchema } from '../schema/stories/ColorSchema';
import { StorySchema } from '../schema/stories/StorySchema';

const storiesConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [StorySchema, ColorSchema],
  schemaVersion: 2,
};

export default storiesConfig;
