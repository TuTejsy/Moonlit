import { SANDBOX } from '@/constants/common';
import { StoryCoverType } from '@/constants/stories';

export const getSandboxPathForCoverType = (type: StoryCoverType) => {
  switch (type) {
    case 'small': {
      return SANDBOX.DOCUMENTS.SMALL_PREVIEW;
    }

    case 'full': {
      return SANDBOX.DOCUMENTS.FULL_COVER;
    }

    case 'medium':
    default: {
      return SANDBOX.DOCUMENTS.MEDIUM_PREVIEW;
    }
  }
};
