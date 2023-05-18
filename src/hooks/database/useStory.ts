import { useRef, useState, useMemo, useEffect } from 'react';

import { ObjectChangeCallback } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/StorySchema.types';

function useStory(storyId: string): [StorySchema | undefined | null, number] {
  const story = useMemo(() => StoriesDB.object(storyId), [storyId]);

  const [storyVersion, setStoryVersion] = useState(0);
  const storyVersionRef = useRef(storyVersion);

  useEffect(() => {
    const listener: ObjectChangeCallback<StorySchema> = (
      nextStory,
      { changedProperties, deleted },
    ) => {
      const isAnythingChanged = !!changedProperties.length;

      if (isAnythingChanged) {
        setStoryVersion(++storyVersionRef.current); // triggers re-render
      }
    };

    StoriesDB.performAfterTransactionComplete(() =>
      story?.addListener(listener as ObjectChangeCallback<unknown>),
    );

    return () => {
      story?.removeListener(listener as ObjectChangeCallback<unknown>);
    };
  }, [story]);

  return [story, storyVersion];
}

export default useStory;
