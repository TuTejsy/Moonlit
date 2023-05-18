import { useCallback, useEffect, useState } from 'react';

import { StoriesDB } from '@/database';
import { StoriesRepository } from '@/services/repositories/stories/stories';

export function useStoriesUpdate(): [boolean, () => void] {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateStories = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const stories = await StoriesRepository.getStories();

      StoriesDB.upsert(stories);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    updateStories();
  }, []);

  return [isRefreshing, updateStories];
}
