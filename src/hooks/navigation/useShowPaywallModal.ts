import { useCallback, useEffect, useRef } from 'react';

import { adapty, AdaptyPaywallProduct, OfferEligibility } from 'react-native-adapty';

import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';
import {
  selectProducts,
  selectProductsOffersEligibility,
} from '@/store/subscription/subscription.selector';
import { setProducts, setProductsOffersEligibility } from '@/store/subscription/subscription.slice';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { setFreeOfferDays } from '@/store/user/user.slice';

import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

interface ShowPaywallModalProps {
  animationType: 'push' | 'modal';
  shouldReplace: boolean;
  onClose?: () => void;
}

export const useShowPaywallModal = (
  { animationType, onClose, shouldReplace }: ShowPaywallModalProps = {
    animationType: 'modal',
    shouldReplace: false,
  },
) => {
  const navigation = useAppNavigation<RootRoutes.GET_STARTED_SCREEN | SharedRoutes.HOME>();
  const isFullVerion = useAppSelector(selectIsFullVersion);

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsOffersEligibility = useAppSelector(selectProductsOffersEligibility);

  const palcementIdRef = useRef(remoteConfigService.placementId);

  const loadProducts = useCallback(async () => {
    try {
      palcementIdRef.current = remoteConfigService.placementId;

      const paywall = await adapty.getPaywall(palcementIdRef.current, 'en', {
        fetchPolicy: 'return_cache_data_if_not_expired_else_load',
        maxAgeSeconds: 60 * 60 * 24, // 24 hours
      });

      const products = await adapty.getPaywallProducts(paywall);
      const offersEligibility = await adapty.getProductsIntroductoryOfferEligibility(products);

      dispatch(setProducts(products));
      dispatch(setProductsOffersEligibility(offersEligibility));

      return products;
    } catch (err) {
      console.log(err);
    }

    return null;
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
      const openPaywall = (
        products: AdaptyPaywallProduct[],
        productsOffersEligibility: Record<string, OfferEligibility>,
      ) => {
        (shouldReplace ? navigation.replace : navigation.navigate)(
          animationType === 'push' ? RootRoutes.PAYWALL_SCREEN : RootRoutes.PAYWALL_MODAL,
          {
            contentName,
            onClose,
            placementId: palcementIdRef.current,
            products,
            productsOffersEligibility,
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
          if (products && productsOffersEligibility) {
            openPaywall(products, productsOffersEligibility);
          } else {
            remoteConfigService.fetchAndActivate().then(loadProducts);
          }
        } else {
          onClose?.();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [
      shouldReplace,
      navigation.replace,
      navigation.navigate,
      animationType,
      onClose,
      dispatch,
      isFullVerion,
      products,
      productsOffersEligibility,
      loadProducts,
    ],
  );

  useEffect(() => {
    remoteConfigService.fetchAndActivate().then(loadProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    areProductsLoaded: !!products && !!productsOffersEligibility,
    isFullVerion,
    isSubscriptionAvailable: !isFullVerion,
    showPaywallModal,
  };
};
