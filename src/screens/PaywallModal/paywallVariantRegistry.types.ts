import { AdaptyPaywallProduct } from 'react-native-adapty';

import type { PaywallRemoteConfig } from './utils/paywallRemoteConfig.utils';

export interface PaywallVariantBaseProps {
  isFreeTrialEnabled: boolean;
  isTrialEligible: boolean;
  onRestorePress: () => void;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  onUnlockPress: () => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
  unlockButtonText: string;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

/** Skip placement and copy overrides forwarded from Adapty paywall remote config. */
export interface PaywallVariantRemoteConfigProps {
  onSkipPress: () => void;
  remoteConfig: PaywallRemoteConfig;
}

export type PaywallVariantProps = PaywallVariantBaseProps & PaywallVariantRemoteConfigProps;
