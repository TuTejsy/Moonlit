import { useCallback, useEffect, useState } from 'react';

import { StoriesDB } from '@/database';
import { StoriesRepository } from '@/services/repositories/stories/stories';

export function useStoriesUpdate(): [boolean, () => void] {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateStories = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const stories = await StoriesRepository.getStories();
      const formattedStories = stories.map((story) => {
        const { created_at_timestamp, updated_at_timestamp } = story;

        const createdDate = new Date(created_at_timestamp);
        const updatedDate = new Date(updated_at_timestamp);

        return {
          ...story,
          created_at_timestamp: createdDate.getTime(),
          updated_at_timestamp: updatedDate.getTime(),
        };
      });

      StoriesDB.upsert(formattedStories);
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
