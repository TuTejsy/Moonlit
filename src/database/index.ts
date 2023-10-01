import audioRecordingsConfig from './configs/audioRecordingsConfig';
import storiesConfig from './configs/storiesConfig';
import RealmDB from './Realm';
import { AudioRecordingSchema } from './schema/audioRecordings/types';
import { StorySchema } from './schema/stories/types';

const StoriesDB = new RealmDB<StorySchema>(storiesConfig, 'Story');
const AudioRecordingsDB = new RealmDB<AudioRecordingSchema>(
  audioRecordingsConfig,
  'AudioRecording',
);

export type RealmDBType = typeof StoriesDB;

export { StoriesDB, AudioRecordingsDB };
