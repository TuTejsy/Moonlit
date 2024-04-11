import { useCallback } from 'react';

import { IS_IOS } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { useAppSelector } from '../useAppSelector';

import { useShowPaywallModal } from './useShowPaywallModal';

interface UseHandleStoryPlayerNavigateProps {
  isFree: boolean;
  source: SOURCE;
  storyId: number;
  contentName?: string;
  tab?: TabEventType;
}

export const useHandleStoryPlayerNavigate = ({
  contentName,
  isFree,
  source,
  storyId,
  tab,
}: UseHandleStoryPlayerNavigateProps) => {
  const isFullVersion = useAppSelector(selectIsFullVersion);
  const navigation = useAppNavigation();

  const { showPaywallModal } = useShowPaywallModal();

  const handleStoryPlayerNavigate = useCallback(() => {
    if (IS_IOS && !isFullVersion && !isFree) {
      showPaywallModal({ contentName, source, tab });
    } else {
      navigation.navigate(RootRoutes.STORY_PLAYER, {
        storyId,
        tab: tab ?? 'All tales',
      });
    }
  }, [contentName, isFree, isFullVersion, navigation, showPaywallModal, source, storyId, tab]);

  return handleStoryPlayerNavigate;
};
