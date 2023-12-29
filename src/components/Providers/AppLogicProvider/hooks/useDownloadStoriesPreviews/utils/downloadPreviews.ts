import RNFS from 'react-native-fs';
import { getColorFromURL } from 'rn-dominant-color';

import { StoryCoverType } from '@/constants/stories';
import { StoriesDB } from '@/database';
import { ColorSchema, StorySchema } from '@/database/schema/stories/types';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { generateStoryCoverCachedName } from '@/utils/generators/generateStoryCoverCachedName';

import { getSandboxPathForCoverType } from './getSandboxPathForCoverType';
import { getStoryCachedNameFieldForCoverType } from './getStoryCachedNameFieldForCoverType';
import { getStoryPreviewURLFieldForCoverType } from './getStoryPreviewURLFieldForCoverType';

export async function downloadPreviews(
  stories: Array<StorySchema>,
  sliceFrom: number,
  sliceTo: number,
  type: StoryCoverType,
) {
  const promises: Array<Promise<RNFS.DownloadResult>> = [];
  const filesCachedNames: Array<string> = [];

  for (let j = sliceFrom ?? 0; j < (sliceTo ?? stories.length); j++) {
    try {
      const story = stories[j];

      const cachedName = generateStoryCoverCachedName(story, type);
      const saveToFilePath = `${getSandboxPathForCoverType(type)}/${cachedName}`;

      const { promise } = RNFS.downloadFile({
        fromUrl: formatServerFileURLToAbsolutePath(
          story[getStoryPreviewURLFieldForCoverType(type)],
        ),
        toFile: saveToFilePath,
      });

      promises.push(promise);
      filesCachedNames.push(cachedName);
    } catch (err) {
      console.error(err);
    }
  }

  const results = await Promise.all(promises);

  if (type === 'small') {
    const colors: Array<ColorSchema | null> = [];

    for (let i = 0; i < filesCachedNames.length; i++) {
      try {
        if (results[i].statusCode === 200 && filesCachedNames[i]) {
          const cachedName = filesCachedNames[i];
          const colorURL = `file://${getSandboxPathForCoverType(type)}/${cachedName}`;

          const storyColors = await getColorFromURL(colorURL);
          colors.push(storyColors);
        }
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
            story.small_cover_cached_name = cachedName;
            story.colors = colors[index];
          }
        }
      });
    });
  } else {
    StoriesDB.modify(() => {
      filesCachedNames.forEach((cachedName, index) => {
        if (results[index].statusCode === 200 && cachedName) {
          const story = stories[sliceFrom + index];

          if (story) {
            story[getStoryCachedNameFieldForCoverType(type)] = cachedName;
          }
        }
      });
    });
  }
}
