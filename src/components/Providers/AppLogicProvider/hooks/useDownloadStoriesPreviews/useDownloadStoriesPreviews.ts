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
      'small_cover_cached_name == nil && medium_cover_cached_name == nil && full_cover_cached_name == nil',
    );

    const storiesWithoutMediumPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name != nil && medium_cover_cached_name == nil && full_cover_cached_name == nil',
    );

    const storiesWithoutFullPreview = StoriesDB.objects().filtered(
      'small_cover_cached_name != nil && medium_cover_cached_name != nil && full_cover_cached_name == nil',
    );

    const previewsListener: CollectionChangeCallback<
      RealmObject<StorySchema, never> & StorySchema,
      [number, RealmObject<StorySchema, never> & StorySchema]
    > = (collection, changes) => {
      const { insertions } = changes;
      const stortedCollection = insertions
        .map((index) => collection[index])
        .sort(({ is_featuring }) => (is_featuring ? 1 : -1));

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

    if (storiesWithoutPreview.length) {
      const sortedCollection = [...storiesWithoutPreview.sorted('is_featuring', true)];
      processStoriesWithoutPreviews(
        sortedCollection.filter((story) => !story[getStoryCachedNameFieldForCoverType('small')]),
        'small',
      );
    }

    if (storiesWithoutMediumPreview.length) {
      const sortedCollection = [...storiesWithoutMediumPreview.sorted('is_featuring', true)];
      processStoriesWithoutPreviews(
        sortedCollection.filter((story) => !story[getStoryCachedNameFieldForCoverType('medium')]),
        'medium',
      );
    }

    if (storiesWithoutFullPreview.length) {
      const sortedCollection = [...storiesWithoutFullPreview.sorted('is_featuring', true)];
      processStoriesWithoutPreviews(
        sortedCollection.filter((story) => !story[getStoryCachedNameFieldForCoverType('full')]),
        'full',
      );
    }

    return () => {
      storiesWithoutPreview.removeListener(previewsListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areFoldersCreated]);
}
