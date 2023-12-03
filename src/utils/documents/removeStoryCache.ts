import RNFS from 'react-native-fs';

import { SANDBOX } from '@/constants/common';
import { StorySchema } from '@/database/schema/stories/types';

export const removeStoryCache = async (story: StorySchema) => {
  await Promise.all([
    RNFS.unlink(`file://${SANDBOX.DOCUMENTS.FULL_COVER}/${story.full_cover_cached_name}`),
    RNFS.unlink(`file://${SANDBOX.DOCUMENTS.MEDIUM_PREVIEW}/${story.medium_cover_cached_name}`),
    RNFS.unlink(`file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${story.small_cover_cached_name}`),
  ]);
};
