import { useCallback, useEffect, useState } from 'react';

import { adapty, AdaptyPaywallProduct } from 'react-native-adapty';

import { PLACEMENT_ID } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { setFreeOfferDays } from '@/store/user/user.slice';

import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useShowPaywallModal = (onClose?: () => void, shouldReplace = false) => {
  const navigation = useAppNavigation<RootRoutes.GET_STARTED_SCREEN | SharedRoutes.HOME>();
  const isFullVerion = useAppSelector(selectIsFullVersion);

  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<AdaptyPaywallProduct[] | null>(null);

  const loadProducts = useCallback(async () => {
    const paywall = await adapty.getPaywall(PLACEMENT_ID, 'en', {
      fetchPolicy: 'return_cache_data_if_not_expired_else_load',
      maxAgeSeconds: 60 * 60 * 24, // 24 hours
    });
    const products = await adapty.getPaywallProducts(paywall);

    setProducts(products);

    return products;
  }, []);

  const showPaywallModal = useCallback(() => {
    try {
      if (!isFullVerion && products) {
        (shouldReplace ? navigation.replace : navigation.navigate)(
          shouldReplace ? RootRoutes.PAYWALL_SCREEN : RootRoutes.PAYWALL_MODAL,
          {
            onClose,
            products,
          },
        );

        const offerDays = products.find(
          (product) => !!product.subscriptionDetails?.introductoryOffers?.[0],
        )?.subscriptionDetails?.introductoryOffers?.[0]?.subscriptionPeriod.numberOfUnits;

        if (offerDays) {
          dispatch(setFreeOfferDays(offerDays));
        }
      } else if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  }, [
    dispatch,
    isFullVerion,
    navigation.navigate,
    navigation.replace,
    onClose,
    products,
    shouldReplace,
  ]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isSubscriptionAvailable: !isFullVerion, showPaywallModal };
};
