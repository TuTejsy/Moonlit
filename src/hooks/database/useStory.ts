import { useState, useEffect } from 'react';

import { ObjectChangeCallback } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';
import { mapById } from '@/utils/getMapById';

import useMutableValue from '../useMutableValue';

function useStory(
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
      let propsToWatchMap: { [props: string]: boolean } = {};

      if (propsToWatch) {
        propsToWatchMap = mapById.toExists(propsToWatch);
      }

      const listener: ObjectChangeCallback<StorySchema> = (
        nextStory,
        { changedProperties, deleted },
      ) => {
        let isAnythingChanged = !!changedProperties.length;

        if (propsToWatch) {
          isAnythingChanged = changedProperties.some((changedProp) => propsToWatchMap[changedProp]);
        }

        if (isAnythingChanged) {
          setStoryVersion(storyVersionRef.current + 1);
          setStory(nextStory);
        }
      };

      StoriesDB.performAfterTransactionComplete(() =>
        story.addListener(listener as ObjectChangeCallback<unknown>),
      );

      return () => {
        story.removeListener(listener as ObjectChangeCallback<unknown>);
      };
    }
  }, [storyId]);

  return [story, storyVersion];
}

export default useStory;
