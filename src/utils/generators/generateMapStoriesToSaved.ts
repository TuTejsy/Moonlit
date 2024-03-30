import Realm from 'realm';

import { StorySchema } from '@/database/schema/stories/types';

export const generateMapStoriesToSaved = (
  stories: Realm.Results<StorySchema>,
): Map<number, boolean> => {
  const map = new Map<number, boolean>();

  stories.forEach((story) => {
    map.set(story.id, story.is_favorite);
  });

  return map;
};
