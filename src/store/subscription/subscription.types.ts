import { AdaptyPaywallProduct } from 'react-native-adapty';

export type PaywallBootstrapStatus = 'pending' | 'ready' | 'failed';

export interface SubscriptionState {
  bootstrapStatus: PaywallBootstrapStatus;
  paywallName: string | null;
  products: AdaptyPaywallProduct[] | null;
}
