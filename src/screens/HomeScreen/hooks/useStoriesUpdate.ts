import { useCallback, useEffect, useState } from 'react';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';
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
          author: story.author,
          category_ids: [0], // story.category_ids.split(', ').map((value) => Number(value)),
          created_at_timestamp: createdDate.getTime(),
          description: story.description,
          full_cover_url: story.full_cover_url,
          id: story.id,
          is_free: story.is_free,
          medium_cover_url: story.medium_cover_url,
          name: story.name,
          played_count: story.played_count,
          revision: story.revision,
          small_cover_url: story.small_cover_url,
          type: 0, // story.type,
          updated_at_timestamp: updatedDate.getTime(),
        } as StorySchema;
      });

      const [upserted, notUpserted] = await StoriesDB.upsert(formattedStories);

      if (notUpserted.length) {
        notUpserted.forEach(({ err }) => console.error(err));
      }
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
