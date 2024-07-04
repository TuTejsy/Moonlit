import { useCallback } from 'react';

import { adapty } from 'react-native-adapty';

import { isDevMode } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AnalyticsService } from '@/services/analytics/analytics';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { lockFullVersion, unlockFullVersion } from '@/store/user/user.slice';

import { useAppSelector } from './useAppSelector';

export const useHandleCheckSubscription = (onSuccess: (isSubscriptionActive: boolean) => void) => {
  const isFullAccess = useAppSelector(selectIsFullVersion);
  const dispatch = useAppDispatch();

  const handleCheckSubscription = useCallback(() => {
    if (isDevMode()) {
      onSuccess(isFullAccess);
    } else {
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
    }
  }, [dispatch, isFullAccess, onSuccess]);

  return handleCheckSubscription;
};
