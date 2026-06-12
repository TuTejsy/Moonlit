import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdaptyPaywallProduct } from 'react-native-adapty';

import { SubscriptionState } from './subscription.types';

export const initialState: SubscriptionState = {
  bootstrapStatus: 'pending',
  paywallName: null,
  paywallRemoteConfig: null,
  products: null,
};

export const subscriptionSlice = createSlice({
  initialState,
  name: 'subscription',
  reducers: {
    setPaywallBootstrapFailed: (state) => {
      state.bootstrapStatus = 'failed';
    },
    setPaywallData: (
      state,
      {
        payload,
      }: PayloadAction<{
        paywallName: string;
        paywallRemoteConfig: Record<string, unknown> | null;
        products: AdaptyPaywallProduct[];
      }>,
    ) => {
      state.bootstrapStatus = 'ready';
      state.paywallName = payload.paywallName;
      state.paywallRemoteConfig = payload.paywallRemoteConfig;
      state.products = payload.products;
    },
    setProducts: (state, { payload }: PayloadAction<AdaptyPaywallProduct[]>) => {
      state.products = payload;
    },
  },
});

export const { setPaywallBootstrapFailed, setPaywallData, setProducts } = subscriptionSlice.actions;
