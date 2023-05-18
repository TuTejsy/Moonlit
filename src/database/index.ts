import storiesConfig from './configs/storiesConfig';
import RealmDB from './Realm';
import { StorySchema } from './schema/stories/StorySchema.types';

const StoriesDB = new RealmDB<StorySchema>(storiesConfig, 'Story');

export type RealmDBType = typeof StoriesDB;

export { StoriesDB };
