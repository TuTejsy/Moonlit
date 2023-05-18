import { useRef, useMemo, useState, useEffect } from 'react';

import { CollectionChangeCallback, Results } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/StorySchema.types';

function useStories(filter?: string): [Results<StorySchema>, number] {
  const stories = useMemo(() => {
    const result = StoriesDB.objects();

    if (filter) {
      return result.filtered(filter);
    }

    return result;
  }, [filter]);

  const [storiesVersion, setstoriesVersion] = useState(0);
  const storiesVersionRef = useRef(storiesVersion);

  useEffect(() => {
    const listener: CollectionChangeCallback<StorySchema> = (nextCollection) => {
      setstoriesVersion(++storiesVersionRef.current);
    };

    StoriesDB.performAfterTransactionComplete(() => stories.addListener(listener));

    return () => {
      stories.removeListener(listener);
    };
  }, [stories]);

  return [stories, storiesVersion];
}

export default useStories;
