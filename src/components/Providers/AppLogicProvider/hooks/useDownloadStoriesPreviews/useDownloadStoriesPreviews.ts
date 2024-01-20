import { useEffect } from 'react';

import { CollectionChangeCallback } from 'realm';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';

import { processStoriesWithoutPreviews } from './utils/processStoriesWithoutPreviews';

const DOWNLOADING_TIMEOUT = 5000;

export function useDownloadStoriesPreviews() {
  useEffect(() => {
    const storiesWithoutSmallPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name == nil',
    );
    const storiesWithoutMediumPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name != nil && medium_cover_cached_name == nil',
    );
    const storiesWithoutFulCover = StoriesDB.objects().filtered(
      'small_cover_cached_name != nil && medium_cover_cached_name != nil && full_cover_cached_name == nil',
    );

    const smallPreviewsListener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews([...collection], 'small');
    };

    StoriesDB.performAfterTransactionComplete(() => {
      storiesWithoutSmallPreview.addListener(smallPreviewsListener);
    });

    const mediumPreviewsListener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews([...collection], 'medium');
    };

    setTimeout(
      () => {
        StoriesDB.performAfterTransactionComplete(() => {
          storiesWithoutMediumPreview.addListener(mediumPreviewsListener);
        });
      },
      storiesWithoutSmallPreview.length ? DOWNLOADING_TIMEOUT : 0,
    );

    const fullCoversListener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews([...collection], 'full');
    };

    const fullTimeout =
      (storiesWithoutSmallPreview.length ? DOWNLOADING_TIMEOUT : 0) +
      (storiesWithoutMediumPreview.length ? DOWNLOADING_TIMEOUT : 0);

    setTimeout(() => {
      StoriesDB.performAfterTransactionComplete(() => {
        storiesWithoutFulCover.addListener(fullCoversListener);
      });
    }, fullTimeout);

    return () => {
      storiesWithoutSmallPreview.removeListener(smallPreviewsListener);
      storiesWithoutMediumPreview.removeListener(mediumPreviewsListener);
      storiesWithoutFulCover.removeListener(fullCoversListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
