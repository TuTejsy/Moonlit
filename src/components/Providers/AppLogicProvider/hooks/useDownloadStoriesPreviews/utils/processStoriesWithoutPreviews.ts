import { StoryCoverType } from '@/constants/stories';
import { StorySchema } from '@/database/schema/stories/types';

import { downloadPreviews } from './downloadPreviews';

const CHUNK_SIZE = 5;

export async function processStoriesWithoutPreviews(
  storiesWithoutPreviews: Array<StorySchema>,
  type: StoryCoverType,
) {
  const collectionLength = storiesWithoutPreviews.length;
  const iterationsAmount = Math.ceil(collectionLength / CHUNK_SIZE);

  for (let i = 0; i < iterationsAmount; i++) {
    try {
      const sliceFrom = i * CHUNK_SIZE;

      const stepCeil = sliceFrom + CHUNK_SIZE;
      const sliceTo = stepCeil > collectionLength ? collectionLength : stepCeil;

      await downloadPreviews(storiesWithoutPreviews, sliceFrom, sliceTo, type);
    } catch (err) {
      console.error(err);
    }
  }
}
