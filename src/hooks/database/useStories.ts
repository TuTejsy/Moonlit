import { useRef, useMemo, useState, useEffect } from 'react';

import { reverse } from 'lodash';
import { CollectionChangeCallback, Results } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/StorySchema.types';

interface SortConfig {
  reverse: boolean;
  sortDescriptor: string;
}

function useStories(filter?: string, sortConfig?: SortConfig): [Results<StorySchema>, number] {
  const stories = useMemo(() => {
    let result = StoriesDB.objects();

    if (filter) {
      result = result.filtered(filter);
    }

    if (sortConfig) {
      result = result.sorted(sortConfig.sortDescriptor, sortConfig.reverse);
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
