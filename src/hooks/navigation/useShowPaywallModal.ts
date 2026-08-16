import { useCallback, useEffect, useRef } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import {
  selectIsPaywallBootstrapFailed,
  selectIsPaywallBootstrapSettled,
  selectIsPaywallReady,
  selectPaywallName,
  selectPaywallRemoteConfig,
  selectProducts,
} from '@/store/subscription/subscription.selector';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { setFreeOfferDays } from '@/store/user/user.slice';

import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

interface ShowPaywallModalProps {
  animationType: 'push' | 'modal';
  shouldReplace: boolean;
  onClose?: () => void;
}

interface ShowPaywallRequest {
  source: SOURCE;
  contentName?: string;
  isSubscriptionExpired?: boolean;
  tab?: TabEventType;
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
  const paywallName = useAppSelector(selectPaywallName);
  const paywallRemoteConfig = useAppSelector(selectPaywallRemoteConfig);
  const isPaywallReady = useAppSelector(selectIsPaywallReady);
  const isPaywallBootstrapSettled = useAppSelector(selectIsPaywallBootstrapSettled);
  const isPaywallBootstrapFailed = useAppSelector(selectIsPaywallBootstrapFailed);

  const pendingRequestRef = useRef<ShowPaywallRequest | null>(null);

  const openPaywall = useCallback(
    (
      loadedProducts: AdaptyPaywallProduct[],
      loadedPaywallName: string,
      loadedRemoteConfig: Record<string, unknown> | null,
      request: ShowPaywallRequest,
    ) => {
      const { contentName, source, tab } = request;

      (shouldReplace ? navigation.replace : navigation.navigate)(
        animationType === 'push' ? RootRoutes.PAYWALL_SCREEN : RootRoutes.PAYWALL_MODAL,
        {
          contentName,
          onClose,
          paywallName: loadedPaywallName,
          products: loadedProducts,
          remoteConfig: loadedRemoteConfig ?? undefined,
          source,
          tab,
        },
      );

      const offerDays = loadedProducts.find((product) => !!product.subscription?.offer)
        ?.subscription?.offer?.phases?.[0]?.subscriptionPeriod?.numberOfUnits;

      if (offerDays) {
        dispatch(setFreeOfferDays(offerDays));
      }
    },
    [animationType, dispatch, navigation.navigate, navigation.replace, onClose, shouldReplace],
  );

  const handleFailedPaywallRequest = useCallback(() => {
    pendingRequestRef.current = null;
    onClose?.();
  }, [onClose]);

  const tryShowPaywall = useCallback(
    (request: ShowPaywallRequest) => {
      const { isSubscriptionExpired = false } = request;

      if (isFullVerion && !isSubscriptionExpired) {
        onClose?.();
        return;
      }

      if (isPaywallReady && products && paywallName) {
        pendingRequestRef.current = null;
        openPaywall(products, paywallName, paywallRemoteConfig, request);
        return;
      }

      if (isPaywallBootstrapFailed) {
        handleFailedPaywallRequest();
        return;
      }

      pendingRequestRef.current = request;
    },
    [
      handleFailedPaywallRequest,
      isFullVerion,
      isPaywallBootstrapFailed,
      isPaywallReady,
      onClose,
      openPaywall,
      paywallName,
      paywallRemoteConfig,
      products,
    ],
  );

  useEffect(() => {
    const pendingRequest = pendingRequestRef.current;

    if (!pendingRequest) {
      return;
    }

    if (isPaywallReady && products && paywallName) {
      pendingRequestRef.current = null;
      openPaywall(products, paywallName, paywallRemoteConfig, pendingRequest);
      return;
    }

    if (isPaywallBootstrapFailed) {
      handleFailedPaywallRequest();
    }
  }, [
    handleFailedPaywallRequest,
    isPaywallBootstrapFailed,
    isPaywallReady,
    openPaywall,
    paywallName,
    paywallRemoteConfig,
    products,
  ]);

  const showPaywallModal = useCallback(
    (request: ShowPaywallRequest) => {
      try {
        tryShowPaywall(request);
      } catch (err) {
        console.error(err);
      }
    },
    [tryShowPaywall],
  );

  return {
    isFullVerion,
    isPaywallBootstrapFailed,
    isPaywallBootstrapSettled,
    isPaywallReady,
    isSubscriptionAvailable: !isFullVerion,
    showPaywallModal,
  };
};

export type ShowPaywallModalType = ReturnType<typeof useShowPaywallModal>['showPaywallModal'];
