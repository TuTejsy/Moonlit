import { useEffect } from 'react';

import { CollectionChangeCallback } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';

import { processStoriesWithoutPreviews } from './utils/processStoriesWithoutPreviews';

export function useDownloadStoriesPreviews() {
  useEffect(() => {
    const storiesWithoutSmallPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name == nil',
    );

    const storiesWithoutMediumPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name != nil && medium_cover_cached_name == nil',
    );

    const storiesWithoutFulCover = StoriesDB.objects().filtered(
      'small_cover_cached_name != nil && medium_cover_cached_name == nil && full_cover_cached_name != nil',
    );

    const smallPreviewsListener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews(storiesWithoutSmallPreview, 'small');
    };

    const mediumPreviewsListener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews(storiesWithoutMediumPreview, 'medium');
    };

    const fullCoversListener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews(storiesWithoutFulCover, 'full');
    };

    StoriesDB.performAfterTransactionComplete(() => {
      storiesWithoutSmallPreview.addListener(smallPreviewsListener);
      storiesWithoutMediumPreview.addListener(mediumPreviewsListener);
      storiesWithoutFulCover.addListener(fullCoversListener);
    });
    return () => {
      storiesWithoutSmallPreview.removeListener(smallPreviewsListener);
      storiesWithoutMediumPreview.removeListener(mediumPreviewsListener);
      storiesWithoutFulCover.removeListener(fullCoversListener);
    };
  }, []);
}
