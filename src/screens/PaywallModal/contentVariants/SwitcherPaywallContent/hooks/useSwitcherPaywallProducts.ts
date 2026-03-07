import { useCallback, useMemo } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppLocalization } from '@/localization/useAppLocalization';

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
      const offerDays = trialProduct?.subscription?.subscriptionPeriod.numberOfUnits;

      const price = trialProduct?.price?.amount;
      const currencyCode = trialProduct?.price?.currencyCode;

      return `${offerDays} ${localize(
        'paywall',
        'daysFreeThen',
      )} ${price} ${currencyCode}/${localize('paywall', 'week')}`;
    }
    const price = yearlyProduct?.price?.amount;
    const currencyCode = yearlyProduct?.price?.currencyCode;

    const subscriptionPeriod = yearlyProduct?.subscription?.subscriptionPeriod.unit;

    return `${localize('paywall', 'tryItNotJust')} ${price} ${currencyCode}/${subscriptionPeriod}`;
  }, [
    isFreeTrialEnabled,
    yearlyProduct?.price?.amount,
    yearlyProduct?.price?.currencyCode,
    yearlyProduct?.subscription?.subscriptionPeriod.unit,
    localize,
    trialProduct?.subscription?.subscriptionPeriod.numberOfUnits,
    trialProduct?.price?.amount,
    trialProduct?.price?.currencyCode,
  ]);

  const handleTrialEnabledChanged = useCallback(
    (isEnabled: boolean) => {
      onSelectProduct(isEnabled && isTrialEligible ? trialProduct : yearlyProduct);
    },
    [onSelectProduct, isTrialEligible, trialProduct, yearlyProduct],
  );

  return { handleTrialEnabledChanged, productText };
};
