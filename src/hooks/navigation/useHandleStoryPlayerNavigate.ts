import { useCallback } from 'react';

import { IS_IOS } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { useAppSelector } from '../useAppSelector';

import { useShowPaywallModal } from './useShowPaywallModal';

interface UseHandleStoryPlayerNavigateProps {
  isFree: boolean;
  storyId: number;
}

export const useHandleStoryPlayerNavigate = ({
  isFree,
  storyId,
}: UseHandleStoryPlayerNavigateProps) => {
  const isFullVersion = useAppSelector(selectIsFullVersion);
  const navigation = useAppNavigation();

  const { showPaywallModal } = useShowPaywallModal();

  const handleStoryPlayerNavigate = useCallback(() => {
    if (IS_IOS && !isFullVersion && !isFree) {
      showPaywallModal();
    } else {
      navigation.navigate(RootRoutes.STORY_PLAYER, {
        storyId,
      });
    }
  }, [isFree, isFullVersion, navigation, showPaywallModal, storyId]);

  return handleStoryPlayerNavigate;
};
