import { useCallback } from 'react';

import { adapty } from 'react-native-adapty';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AnalyticsService } from '@/services/analytics/analytics';
import { lockFullVersion, unlockFullVersion } from '@/store/user/user.slice';

export const useHandleCheckSubscription = (onSuccess: (isSubscriptionActive: boolean) => void) => {
  const dispatch = useAppDispatch();

  const handleCheckSubscription = useCallback(() => {
    adapty.getProfile().then((profile) => {
      const isActive = profile?.accessLevels?.premium?.isActive;

      AnalyticsService.setIsUserPaid(isActive ?? false);

      if (isActive) {
        dispatch(unlockFullVersion());
      } else {
        dispatch(lockFullVersion());
      }

      onSuccess(isActive || false);
    });
  }, [dispatch, onSuccess]);

  return handleCheckSubscription;
};
