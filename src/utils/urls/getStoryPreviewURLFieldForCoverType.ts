import { StoryCoverType } from '@/constants/stories';

export const getStoryPreviewURLFieldForCoverType = (
  type: StoryCoverType,
): 'small_cover_url' | 'full_cover_url' | 'medium_cover_url' => {
  switch (type) {
    case 'small': {
      return 'small_cover_url';
    }

    case 'full': {
      return 'full_cover_url';
    }

    case 'medium':
    default: {
      return 'medium_cover_url';
    }
  }
};
