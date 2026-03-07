import { useCallback, useRef } from 'react';

import { useSharedValue, withTiming } from 'react-native-reanimated';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';

import { STEPS } from '../GetStartedScreen.constants';

export const useOnboardingSteps = () => {
  const navigation = useAppNavigation<RootRoutes.GET_STARTED_SCREEN>();

  const currentStepRef = useRef(0);
  const currentStepSharedValue = useSharedValue(currentStepRef.current);

  const handleClosePaywallModal = useCallback(() => {
    navigation.replace(RootRoutes.TAB, {
      screen: SharedRoutes.HOME,
    });
  }, [navigation]);

  const { showPaywallModal } = useShowPaywallModal({
    animationType: 'push',
    onClose: handleClosePaywallModal,
    shouldReplace: true,
  });

  const handleContinuePress = useCallback(() => {
    if (currentStepRef.current === STEPS.length - 1) {
      storage.set(StorageKeys.isOnboarded, true);

      showPaywallModal({ source: SOURCE.ONBOARDING });
    } else {
      currentStepRef.current += 1;
      AnalyticsService.logOnboardingEvent({ screen: currentStepRef.current + 1 });
    }

    currentStepSharedValue.value = withTiming(currentStepRef.current);
  }, [currentStepSharedValue, showPaywallModal]);

  const handleBackPress = useCallback(() => {
    if (currentStepRef.current !== 0) {
      currentStepRef.current -= 1;
      currentStepSharedValue.value = withTiming(currentStepRef.current);
    }
  }, [currentStepSharedValue]);

  return {
    currentStepSharedValue,
    handleBackPress,
    handleContinuePress,
  };
};
