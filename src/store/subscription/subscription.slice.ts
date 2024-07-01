import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdaptyPaywallProduct, OfferEligibility } from 'react-native-adapty';

import { SubscriptionState } from './subscription.types';

export const initialState: SubscriptionState = {
  products: null,
  productsOffersEligibility: null,
};

export const subscriptionSlice = createSlice({
  initialState,
  name: 'subscription',
  reducers: {
    setProducts: (state, { payload }: PayloadAction<AdaptyPaywallProduct[]>) => {
      state.products = payload;
    },

    setProductsOffersEligibility: (
      state,
      { payload }: PayloadAction<Record<string, OfferEligibility>>,
    ) => {
      state.productsOffersEligibility = payload;
    },
  },
});

export const { setProducts, setProductsOffersEligibility } = subscriptionSlice.actions;
