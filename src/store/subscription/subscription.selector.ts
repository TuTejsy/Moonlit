import pipe from 'lodash/fp/pipe';

import { RootState } from '../store';

const subscriptionSelector = (state: RootState) => state.subscription;

export const selectProducts = pipe(subscriptionSelector, (state) => state.products);

export const selectPaywallName = pipe(subscriptionSelector, (state) => state.paywallName);

export const selectPaywallRemoteConfig = pipe(
  subscriptionSelector,
  (state) => state.paywallRemoteConfig,
);

export const selectPaywallBootstrapStatus = pipe(
  subscriptionSelector,
  (state) => state.bootstrapStatus,
);

export const selectIsPaywallReady = pipe(subscriptionSelector, (state) => {
  return (
    state.bootstrapStatus === 'ready' &&
    state.products !== null &&
    state.products.length > 0 &&
    state.paywallName !== null
  );
});

export const selectIsPaywallBootstrapSettled = pipe(subscriptionSelector, (state) => {
  return state.bootstrapStatus !== 'pending';
});

export const selectIsPaywallBootstrapFailed = pipe(subscriptionSelector, (state) => {
  return state.bootstrapStatus === 'failed';
});
