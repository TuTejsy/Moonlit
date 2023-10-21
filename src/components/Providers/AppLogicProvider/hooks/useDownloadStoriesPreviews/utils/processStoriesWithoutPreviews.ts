import { Results } from 'realm';

import { StoryCoverType } from '@/constants/stories';
import { StorySchema } from '@/database/schema/stories/types';

import { downloadPreviews } from './downloadPreviews';

const CHUNK_SIZE = 5;

export async function processStoriesWithoutPreviews(
  storiesWithoutPreviews: Results<StorySchema>,
  type: StoryCoverType,
) {
  try {
    const collectionLength = storiesWithoutPreviews.length;
    const iterationsAmount = Math.ceil(collectionLength / CHUNK_SIZE);

    for (let i = 0; i < iterationsAmount; i++) {
      const sliceFrom = i * CHUNK_SIZE;

      const stepCeil = sliceFrom + CHUNK_SIZE;
      const sliceTo = stepCeil > collectionLength ? collectionLength : stepCeil;

      await downloadPreviews(storiesWithoutPreviews, sliceFrom, sliceTo, type);
    }
  } catch (err) {
    console.error(err);
  }
}
