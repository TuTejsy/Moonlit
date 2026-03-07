import { useCallback } from 'react';
import { Share } from 'react-native';

import { IS_IOS, MOONLIT_IOS_APP_LINK, MOONLIT_PLAY_STORE_APP_LINK } from '@/constants/common';
import { ShareIOS } from '@/native_modules/MNTShare/NativeShareManager';

interface UseStoryShareProps {
  smallCoverURL: string;
  storyName?: string;
}

export const useStoryShare = ({ smallCoverURL, storyName }: UseStoryShareProps) => {
  const handleSharePress = useCallback(() => {
    if (IS_IOS) {
      ShareIOS?.share({
        message: `Explore ${storyName} and more amazing stories in the Moonlit app. ${MOONLIT_IOS_APP_LINK}`,
        subtitle: 'and more amazing stories in the Moonlit app.',
        title: `Explore ${storyName}`,
        url: smallCoverURL,
      });
    } else {
      Share.share(
        {
          message: `Explore ${storyName} and more amazing stories in the Moonlit app. ${MOONLIT_PLAY_STORE_APP_LINK}`,
        },
        {
          dialogTitle: `Explore ${storyName}`,
        },
      );
    }
  }, [smallCoverURL, storyName]);

  return { handleSharePress };
};
