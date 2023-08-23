import { useEffect } from 'react';

import RNFS from 'react-native-fs';
import { CollectionChangeCallback, Results } from 'realm';
import { getColorFromURL } from 'rn-dominant-color';

import { SANDBOX } from '@/constants/common';
import { StoriesDB } from '@/database';
import { ColorSchema, StorySchema } from '@/database/schema/stories/types';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { generateStoryCoverCachedName } from '@/utils/generators/generateStoryCoverCachedName';

const CHUNK_SIZE = 5;

export function useDownloadStoriesPreviews() {
  useEffect(() => {
    const storiesWithoutPreviews = StoriesDB.objects().filtered(
      'small_preview_cover_cached_name == nil',
    );

    const listener: CollectionChangeCallback<StorySchema> = (collection, changes) => {
      processStoriesWithoutPreviews(storiesWithoutPreviews);
    };

    StoriesDB.performAfterTransactionComplete(() => storiesWithoutPreviews.addListener(listener));
    return () => {
      storiesWithoutPreviews.removeListener(listener);
    };
  }, []);
}

async function processStoriesWithoutPreviews(storiesWithoutPreviews: Results<StorySchema>) {
  try {
    const collectionLength = storiesWithoutPreviews.length;
    const iterationsAmount = Math.ceil(collectionLength / CHUNK_SIZE);

    for (let i = 0; i < iterationsAmount; i++) {
      const sliceFrom = i * CHUNK_SIZE;

      const stepCeil = sliceFrom + CHUNK_SIZE;
      const sliceTo = stepCeil > collectionLength ? collectionLength : stepCeil;

      await downloadPreviews(storiesWithoutPreviews, sliceFrom, sliceTo);
    }
  } catch (err) {
    console.error(err);
  }
}

async function downloadPreviews(stories: Results<StorySchema>, sliceFrom: number, sliceTo: number) {
  const promises: Array<Promise<RNFS.DownloadResult>> = [];
  const filesCachedNames: Array<string> = [];

  for (let j = sliceFrom ?? 0; j < (sliceTo ?? stories.length); j++) {
    try {
      if (stories.isValid && !stories.isValid()) {
        break;
      }

      const story = stories[j];

      const cachedName = generateStoryCoverCachedName(story, 'small');
      const saveToFilePath = `${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${cachedName}`;

      const { promise } = RNFS.downloadFile({
        fromUrl: formatServerFileURLToAbsolutePath(story.small_cover_url),
        toFile: saveToFilePath,
      });

      promises.push(promise);
      filesCachedNames.push(cachedName);
    } catch (err) {
      console.error(err);
    }
  }

  const results = await Promise.all(promises);
  const colors: Array<ColorSchema | null> = [];

  for (let i = 0; i < filesCachedNames.length; i++) {
    try {
      const cachedName = filesCachedNames[i];
      const colorURL = `file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${cachedName}`;

      const storyColors = await getColorFromURL(colorURL);
      colors.push(storyColors);
    } catch (err) {
      if (!colors[i]) {
        colors[i] = null;
      }
    }
  }

  StoriesDB.modify(() => {
    filesCachedNames.forEach((cachedName, index) => {
      if (results[index].statusCode === 200 && cachedName) {
        const story = stories[sliceFrom + index];

        if (story) {
          story.small_preview_cover_cached_name = cachedName;
          story.colors = colors[index];
        }
      }
    });
  });
}
