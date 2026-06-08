import { useCallback, useMemo } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppLocalization } from '@/localization/useAppLocalization';
import {
  formatProductLocalizedPrice,
  getFreeTrialOfferDays,
  getLocalizedSubscriptionPeriodLabel,
} from '@/screens/PaywallModal/utils/paywallProduct.utils';

interface UseSwitcherPaywallProductsProps {
  isFreeTrialEnabled: boolean;
  isTrialEligible: boolean;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  trialProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const useSwitcherPaywallProducts = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onSelectProduct,
  trialProduct,
  yearlyProduct,
}: UseSwitcherPaywallProductsProps) => {
  const { localize } = useAppLocalization();

  const productText = useMemo(() => {
    if (isFreeTrialEnabled) {
      const offerDays = getFreeTrialOfferDays(trialProduct);
      const price = formatProductLocalizedPrice(trialProduct);

      return `${offerDays ?? ''} ${localize('paywall', 'daysFreeThen')} ${price}/${localize(
        'paywall',
        'week',
      )}`;
    }

    const price = formatProductLocalizedPrice(yearlyProduct);
    const subscriptionPeriod = getLocalizedSubscriptionPeriodLabel(yearlyProduct, localize);

    return `${localize('paywall', 'tryItNotJust')} ${price}/${subscriptionPeriod}`;
  }, [isFreeTrialEnabled, localize, trialProduct, yearlyProduct]);

  const handleTrialEnabledChanged = useCallback(
    (isEnabled: boolean) => {
      onSelectProduct(isEnabled && isTrialEligible ? trialProduct : yearlyProduct);
    },
    [onSelectProduct, isTrialEligible, trialProduct, yearlyProduct],
  );

  return { handleTrialEnabledChanged, productText };
};
