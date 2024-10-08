import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { StoriesRepository } from '@/api/stories/stories';
import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';
import { removeStoryCache } from '@/utils/documents/removeStoryCache';

export function useStoriesUpdate(loadInitially = true): [boolean, () => void] {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateStories = useCallback(async () => {
    let error: AxiosError | null = null;

    try {
      setIsRefreshing(true);
      const stories = await StoriesRepository.getStories();
      const formattedStories: StorySchema[] = [];
      const storiesIdsSet = new Set<number>();

      for (let i = 0; i < stories.length; i++) {
        const story = stories[i];

        const { created_at_timestamp, id, revision, updated_at_timestamp } = story;

        const currentStory = StoriesDB.object(id);
        const isRevisionChanged = currentStory && revision > currentStory.revision;

        const createdDate = new Date(created_at_timestamp);
        const updatedDate = new Date(updated_at_timestamp);

        const formattedStory = {
          author: story.author,
          category_ids: story.category_ids,
          created_at_timestamp: createdDate.getTime(),
          description: story.description,
          description_large: story.description_large,
          full_cover_url: story.full_cover_url,
          id: story.id,
          is_coming_soon: story.is_coming_soon ?? false,
          is_favorite: currentStory?.is_favorite,
          is_featuring: story.is_featuring,
          is_free: story.is_free,
          medium_cover_url: story.medium_cover_url,
          name: story.name,
          played_count: story.played_count,
          revision: story.revision,
          small_cover_url: story.small_cover_url,
          type: 1,
          updated_at_timestamp: updatedDate.getTime(),
        } as StorySchema;

        if (isRevisionChanged) {
          formattedStory.full_cover_cached_name = null;
          formattedStory.medium_cover_cached_name = null;
          formattedStory.small_cover_cached_name = null;

          await removeStoryCache(currentStory);
        }

        formattedStories.push(formattedStory);
        storiesIdsSet.add(story.id);
      }

      const [_upserted, notUpserted] = await StoriesDB.upsert(formattedStories);

      if (notUpserted.length) {
        notUpserted.forEach(({ err }) => console.error(err));
      }

      const storiesIdsToRemove: Array<number> = [];
      const allStories = StoriesDB.objects();

      for (let i = 0; i < allStories.length; i++) {
        const story = allStories[i];

        if (!storiesIdsSet.has(story.id)) {
          storiesIdsToRemove.push(story.id);
          await removeStoryCache(story);
        }
      }

      await StoriesDB.delete(storiesIdsToRemove);
    } catch (err) {
      console.log((err as AxiosError).request);
      console.error(err);
      error = err as AxiosError;
    } finally {
      setIsRefreshing(false);
    }

    return error;
  }, []);

  useEffect(() => {
    if (loadInitially) {
      updateStories().then((error) => {
        if (error) {
          updateStories();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isRefreshing, updateStories];
}
