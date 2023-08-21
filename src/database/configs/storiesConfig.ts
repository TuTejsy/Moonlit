import { ZRKRealmConfiguration } from 'realm';

import { StorySchema } from '../schema/stories/StorySchema';

const storiesConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [StorySchema],
  schemaVersion: 2,
};

export default storiesConfig;
