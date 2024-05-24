import { StoryCoverType } from '@/constants/stories';
import { StorySchema } from '@/database/schema/stories/types';

import { getSandboxPathForCoverType } from './getSandboxPathForCoverType';
import { getStoryCachedNameFieldForCoverType } from './getStoryCachedNameFieldForCoverType';

const STORY_TYPES_RANGE: StoryCoverType[] = ['small', 'medium', 'full'];

export const getImageFilePathForStory = (story: StorySchema, upToType: StoryCoverType) => {
  const upToTypeIndex = STORY_TYPES_RANGE.findIndex((value) => value === upToType);

  const availableTypeRange: StoryCoverType[] = STORY_TYPES_RANGE.slice(0, upToTypeIndex + 1);

  for (let i = availableTypeRange.length - 1; i >= 0; i--) {
    const storyType = availableTypeRange[i];

    const cachedName = story[getStoryCachedNameFieldForCoverType(storyType)];

    if (cachedName) {
      const fullPath = `file://${getSandboxPathForCoverType(storyType)}/${cachedName}`;

      return fullPath;
    }
  }
};
