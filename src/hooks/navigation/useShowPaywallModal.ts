import { useCallback } from 'react';

import { adapty } from 'react-native-adapty';

import { PLACEMENT_ID } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { setFreeOfferDays } from '@/store/user/user.slice';

import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useShowPaywallModal = () => {
  const navigation = useAppNavigation();
  const isFullVerion = useAppSelector(selectIsFullVersion);

  const dispatch = useAppDispatch();

  const showPaywallModal = useCallback(async () => {
    try {
      const paywall = await adapty.getPaywall(PLACEMENT_ID, 'en', {
        fetchPolicy: 'return_cache_data_if_not_expired_else_load',
        maxAgeSeconds: 60 * 60 * 24, // 24 hours
      });
      const products = await adapty.getPaywallProducts(paywall);

      if (!isFullVerion && products) {
        navigation.navigate(RootRoutes.PAYWALL_MODAL, {
          products,
        });

        const offerDays = products.find(
          (product) => !!product.subscriptionDetails?.introductoryOffers?.[0],
        )?.subscriptionDetails?.introductoryOffers?.[0]?.subscriptionPeriod.numberOfUnits;

        if (offerDays) {
          dispatch(setFreeOfferDays(offerDays));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, isFullVerion, navigation]);

  return { isSubscriptionAvailable: !isFullVerion, showPaywallModal };
};
