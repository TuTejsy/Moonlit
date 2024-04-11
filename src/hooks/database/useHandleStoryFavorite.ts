import { useCallback, useMemo } from 'react';

import { StoriesDB } from '@/database';
import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';

import { useStory } from './useStory';

interface UseHandleStoryFavoriteProps {
  source: SOURCE.TALE_PLAYER | SOURCE.TALE_PREVIEW;
  storyId: number;
  storyName: string;
  tab: TabEventType;
}

export function useHandleStoryFavorite({
  source,
  storyId,
  storyName,
  tab,
}: UseHandleStoryFavoriteProps) {
  const [story, storyVersion] = useStory(storyId, ['is_favorite']);

  const isFavorite = useMemo(() => story?.is_favorite ?? false, [story?.is_favorite]);

  const handleStoryFavoritePress = useCallback(() => {
    if (!story) {
      return;
    }

    if (!isFavorite) {
      AnalyticsService.logTaleLikedEvent({ name: storyName, source, tab });
    }

    StoriesDB.modify(() => {
      story.is_favorite = !isFavorite;
      story.saved_at_timestamp = Date.now();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story, isFavorite, storyName, source, tab, storyVersion]);

  return { handleStoryFavoritePress, isFavorite };
}
