import { useCallback, useEffect } from 'react';

import { SubscriptionIOS, useIAP } from 'react-native-iap';

import { PRODUCT_ID } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { useAppSelector } from '../useAppSelector';

export const useShowPaywallModal = () => {
  const navigation = useAppNavigation();
  const isFullVerion = useAppSelector(selectIsFullVersion);

  // const { connected, getSubscriptions, subscriptions } = useIAP();
  // const [subscription] = subscriptions;
  // const isSubscriptionAvailable = connected && subscription && !isFullVerion;

  useEffect(() => {
    // getSubscriptions({ skus: [PRODUCT_ID] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showPaywallModal = useCallback(() => {
    // const [subscription] = subscriptions;
    // if (isSubscriptionAvailable) {
    //   navigation.navigate(RootRoutes.PAYWALL_MODAL, {
    //     subscription: subscription as SubscriptionIOS,
    //   });
    // }
  }, []);

  return { isSubscriptionAvailable: false, showPaywallModal };
};
