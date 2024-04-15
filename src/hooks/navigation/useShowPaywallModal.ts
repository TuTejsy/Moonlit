import { useCallback, useEffect } from 'react';

import { adapty, AdaptyPaywallProduct } from 'react-native-adapty';

import { IS_ANDROID, PLACEMENT_ID } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { selectProducts } from '@/store/subscription/subscription.selector';
import { setProducts } from '@/store/subscription/subscription.slice';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { setFreeOfferDays } from '@/store/user/user.slice';

import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useShowPaywallModal = (onClose?: () => void, shouldReplace = false) => {
  const navigation = useAppNavigation<RootRoutes.GET_STARTED_SCREEN | SharedRoutes.HOME>();
  const isFullVerion = useAppSelector(selectIsFullVersion);

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const loadProducts = useCallback(async () => {
    const paywall = await adapty.getPaywall(PLACEMENT_ID, 'en', {
      fetchPolicy: 'return_cache_data_if_not_expired_else_load',
      maxAgeSeconds: 60 * 60 * 24, // 24 hours
    });
    const products = await adapty.getPaywallProducts(paywall);

    dispatch(setProducts(products));

    return products;
  }, [dispatch]);

  const showPaywallModal = useCallback(
    ({
      contentName,
      source,
      tab,
    }: {
      source: SOURCE;
      contentName?: string;
      tab?: TabEventType;
    }) => {
      const openPaywall = (products: AdaptyPaywallProduct[]) => {
        (shouldReplace ? navigation.replace : navigation.navigate)(
          shouldReplace ? RootRoutes.PAYWALL_SCREEN : RootRoutes.PAYWALL_MODAL,
          {
            contentName,
            onClose,
            products,
            source,
            tab,
          },
        );

        const offerDays = products.find(
          (product) => !!product.subscriptionDetails?.introductoryOffers?.[0],
        )?.subscriptionDetails?.introductoryOffers?.[0]?.subscriptionPeriod.numberOfUnits;

        if (offerDays) {
          dispatch(setFreeOfferDays(offerDays));
        }
      };

      try {
        if (!isFullVerion) {
          if (products) {
            openPaywall(products);
          } else {
            loadProducts();
          }
        } else {
          onClose?.();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [
      dispatch,
      loadProducts,
      isFullVerion,
      navigation.navigate,
      navigation.replace,
      onClose,
      products,
      shouldReplace,
    ],
  );

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    areProductsLoaded: !!products || IS_ANDROID,
    isSubscriptionAvailable: !isFullVerion,
    showPaywallModal,
  };
};
