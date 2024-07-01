import { AdaptyPaywallProduct, OfferEligibility } from 'react-native-adapty';

export interface SubscriptionState {
  products: AdaptyPaywallProduct[] | null;
  productsOffersEligibility: Record<string, OfferEligibility> | null;
}
