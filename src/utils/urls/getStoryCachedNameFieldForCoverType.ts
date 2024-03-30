import { StoryCoverType } from '@/constants/stories';

export const getStoryCachedNameFieldForCoverType = (
  type: StoryCoverType,
): 'full_cover_cached_name' | 'medium_cover_cached_name' | 'small_cover_cached_name' => {
  switch (type) {
    case 'small': {
      return 'small_cover_cached_name';
    }

    case 'full': {
      return 'full_cover_cached_name';
    }

    case 'medium':
    default: {
      return 'medium_cover_cached_name';
    }
  }
};
