import { useCallback, useMemo } from 'react';

import { StoriesDB } from '@/database';

import useStory from './useStory';

export function useHandleStoryFavorite(storyId: number) {
  const [story, storyVersion] = useStory(storyId, ['is_favorite']);

  const isFavorite = useMemo(() => story?.is_favorite ?? false, [storyVersion]);

  const handleStoryFavoritePress = useCallback(() => {
    if (!story) {
      return;
    }

    StoriesDB.modify(() => {
      story.is_favorite = !isFavorite;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story, storyVersion, isFavorite]);

  return { handleStoryFavoritePress, isFavorite };
}
