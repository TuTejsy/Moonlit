import { useCallback } from 'react';

import { adapty } from 'react-native-adapty';

import { PLACEMENT_ID } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { useAppSelector } from '../useAppSelector';

export const useShowPaywallModal = () => {
  const navigation = useAppNavigation();
  const isFullVerion = useAppSelector(selectIsFullVersion);

  const showPaywallModal = useCallback(async () => {
    try {
      const paywall = await adapty.getPaywall(PLACEMENT_ID, 'en');
      const [product] = await adapty.getPaywallProducts(paywall);

      if (!isFullVerion && product) {
        navigation.navigate(RootRoutes.PAYWALL_MODAL, {
          product,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFullVerion, navigation]);

  return { isSubscriptionAvailable: !isFullVerion, showPaywallModal };
};
