import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdaptyPaywallProduct } from 'react-native-adapty';

import { SubscriptionState } from './subscription.types';

export const initialState: SubscriptionState = {
  products: null,
};

export const subscriptionSlice = createSlice({
  initialState,
  name: 'subscription',
  reducers: {
    setProducts: (state, { payload }: PayloadAction<AdaptyPaywallProduct[]>) => {
      state.products = payload;
    },
  },
});

export const { setProducts } = subscriptionSlice.actions;
