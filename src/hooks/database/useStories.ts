import { useRef, useMemo, useState, useEffect } from 'react';

import { CollectionChangeCallback, Results } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';

export interface SortConfig {
  reverse: boolean;
  sortDescriptor: keyof StorySchema;
}

export function useStories(
  filter?: string,
  sortConfig?: SortConfig,
): [Results<StorySchema>, number] {
  const stories = useMemo(() => {
    let result = StoriesDB.objects();

    if (filter) {
      result = result.filtered(filter);
    }

    const config = sortConfig ?? {
      reverse: true,
      sortDescriptor: 'updated_at_timestamp',
    };

    result = result.sorted(config.sortDescriptor, config.reverse);

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
