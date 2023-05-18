import { ZRKRealmConfiguration } from 'realm';

import { StorySchema } from '../schema/stories/StorySchema';

const storiesConfig: ZRKRealmConfiguration = {
  deleteCache: () => {},

  deleteRealmIfMigrationNeeded: true,

  schema: [StorySchema],
  schemaVersion: 1,
};

export default storiesConfig;
