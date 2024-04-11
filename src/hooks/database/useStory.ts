import { useState, useEffect } from 'react';

import { ObjectChangeCallback } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';

import { useMutableValue } from '../useMutableValue';

export function useStory(
  storyId: number,
  propsToWatch?: Array<keyof StorySchema>,
): [StorySchema | undefined | null, number] {
  const [story, setStory] = useState<StorySchema | null>(StoriesDB.object(storyId));

  const [storyVersion, setStoryVersion] = useState(0);
  const storyVersionRef = useMutableValue(storyVersion);

  useEffect(() => {
    const story = StoriesDB.object(storyId);

    if (story) {
      setStory(story);
      setStoryVersion(storyVersionRef.current + 1);

      const listener: ObjectChangeCallback<StorySchema> = (nextStory, { changedProperties }) => {
        const isAnythingChanged = !!changedProperties.length;

        if (isAnythingChanged) {
          setStoryVersion(storyVersionRef.current + 1);
          setStory(nextStory);
        }
      };

      StoriesDB.performAfterTransactionComplete(() => story.addListener(listener, propsToWatch));

      return () => {
        story.removeListener(listener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  return [story, storyVersion];
}
