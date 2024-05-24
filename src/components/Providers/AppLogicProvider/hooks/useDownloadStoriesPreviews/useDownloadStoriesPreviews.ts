import { useEffect } from 'react';

import { CollectionChangeCallback } from 'realm';
// eslint-disable-next-line import/no-unresolved
import { RealmObject } from 'realm/dist/public-types/Object';

import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';
import { getStoryCachedNameFieldForCoverType } from '@/utils/urls/getStoryCachedNameFieldForCoverType';

import { processStoriesWithoutPreviews } from './utils/processStoriesWithoutPreviews';

export function useDownloadStoriesPreviews(areFoldersCreated: boolean) {
  useEffect(() => {
    if (!areFoldersCreated) {
      return;
    }

    const storiesWithoutPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name == nil || medium_cover_cached_name == nil || full_cover_cached_name == nil',
    );

    const previewsListener: CollectionChangeCallback<
      RealmObject<StorySchema, never> & StorySchema,
      [number, RealmObject<StorySchema, never> & StorySchema]
    > = (collection, changes) => {
      const stortedCollection = [...collection.sorted('is_featuring', true)];

      processStoriesWithoutPreviews(
        stortedCollection.filter((story) => !story[getStoryCachedNameFieldForCoverType('small')]),
        'small',
      ).then(() => {
        processStoriesWithoutPreviews(
          stortedCollection.filter(
            (story) => !story[getStoryCachedNameFieldForCoverType('medium')],
          ),
          'medium',
        ).then(() => {
          processStoriesWithoutPreviews(
            stortedCollection.filter(
              (story) => !story[getStoryCachedNameFieldForCoverType('full')],
            ),
            'full',
          );
        });
      });
    };

    StoriesDB.performAfterTransactionComplete(() => {
      StoriesDB.objects().addListener(previewsListener);
    });

    return () => {
      storiesWithoutPreview.removeListener(previewsListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areFoldersCreated]);
}
