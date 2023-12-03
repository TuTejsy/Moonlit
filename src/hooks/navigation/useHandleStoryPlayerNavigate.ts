import { useCallback } from 'react';

import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { useAppSelector } from '../useAppSelector';

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

  const handleStoryPlayerNavigate = useCallback(() => {
    if (!isFullVersion && !isFree) {
      navigation.navigate(RootRoutes.PAYWALL_MODAL);
    } else {
      navigation.navigate(RootRoutes.STORY_PLAYER, {
        storyId,
      });
    }
  }, [isFree, isFullVersion, navigation, storyId]);

  return handleStoryPlayerNavigate;
};
