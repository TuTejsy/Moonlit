import { useRef, useMemo, useState, useEffect } from 'react';

import Realm, { CollectionChangeCallback, SortDescriptor } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';

export interface SortConfig {
  reverse: boolean;
  sortDescriptor: keyof StorySchema;
}

export function useStories(
  filter?: string,
  sortConfigs?: SortConfig[],
  maxNum?: number,
): [Realm.Results<StorySchema>, number] {
  const stories = useMemo(() => {
    let result = StoriesDB.objects();

    if (filter) {
      result = result.filtered(filter);
    }

    const configs: SortConfig[] = sortConfigs || [
      {
        reverse: false,
        sortDescriptor: 'is_coming_soon',
      },
      {
        reverse: true,
        sortDescriptor: 'updated_at_timestamp',
      },
    ];

    const mappedConfig: SortDescriptor[] = configs.map(({ reverse, sortDescriptor }) => [
      sortDescriptor,
      reverse,
    ]);

    result = result.sorted(mappedConfig);

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

  return [
    (maxNum ? stories.slice(0, maxNum) : stories) as unknown as Realm.Results<StorySchema>,
    storiesVersion,
  ];
}
