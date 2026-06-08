import { useEffect, useRef } from 'react';

import { adapty } from 'react-native-adapty';

import { LOCKED_CONTENT_PLACEMENT_ID } from '@/constants/common';
import {
  LOCKED_CONTENT_PAYWALL_FETCH_PARAMS,
  normalizeAdaptyPaywallName,
} from '@/hooks/paywallBootstrap.utils';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setPaywallBootstrapFailed, setPaywallData } from '@/store/subscription/subscription.slice';

import { ensureAdaptyActivated } from './useAdaptyInit';

export const usePaywallBootstrap = (): void => {
  const dispatch = useAppDispatch();
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (hasBootstrapped.current && !__DEV__) {
      return;
    }

    hasBootstrapped.current = true;

    const loadPaywall = async () => {
      try {
        await ensureAdaptyActivated();

        const paywall = await adapty.getPaywall(
          LOCKED_CONTENT_PLACEMENT_ID,
          'en',
          LOCKED_CONTENT_PAYWALL_FETCH_PARAMS,
        );

        const products = await adapty.getPaywallProducts(paywall);

        if (products.length === 0) {
          dispatch(setPaywallBootstrapFailed());
          return;
        }

        dispatch(
          setPaywallData({
            paywallName: normalizeAdaptyPaywallName(paywall),
            products,
          }),
        );
      } catch (error: unknown) {
        dispatch(setPaywallBootstrapFailed());

        if (__DEV__) {
          console.error('[usePaywallBootstrap] Failed to load paywall:', error);
        }
      }
    };

    loadPaywall().catch((error: unknown) => {
      dispatch(setPaywallBootstrapFailed());

      if (__DEV__) {
        console.error('[usePaywallBootstrap] Unexpected error:', error);
      }
    });
  }, [dispatch]);
};
