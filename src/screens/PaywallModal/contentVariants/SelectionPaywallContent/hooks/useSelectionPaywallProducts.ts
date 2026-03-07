import { useCallback, useMemo, useState } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppLocalization } from '@/localization/useAppLocalization';

import { WEEKS_IN_YEAR } from '../SelectionPaywallContent.constants';

export interface UseSelectionPaywallProductsProps {
  isFreeTrialEnabled: boolean;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const useSelectionPaywallProducts = ({
  isFreeTrialEnabled,
  onSelectProduct,
  selectedProduct,
  trialProduct,
  weeklyProduct,
  yearlyProduct,
}: UseSelectionPaywallProductsProps) => {
  const { localize } = useAppLocalization();
  const [isFreeTrialToggle, setIsFreeTrialToggle] = useState(isFreeTrialEnabled);

  const yearlyPricePerWeek = useMemo(
    () => (yearlyProduct?.price?.amount || 0) / WEEKS_IN_YEAR,
    [yearlyProduct?.price?.amount],
  );

  const yearlyProductBenifitText = useMemo(() => {
    const trialPricePerWeek = trialProduct?.price?.amount || 0;

    const pricesDiffInPercents = Math.round(
      ((trialPricePerWeek - yearlyPricePerWeek) / trialPricePerWeek) * 100,
    );

    return `Save ${pricesDiffInPercents}%`;
  }, [yearlyPricePerWeek, trialProduct?.price?.amount]);

  const yearlyPriceText = useMemo(
    () => `${yearlyProduct?.price?.currencySymbol}${yearlyProduct?.price?.amount || 0}`,
    [yearlyProduct?.price?.amount, yearlyProduct?.price?.currencySymbol],
  );

  const yearlyPricePerWeekText = useMemo(
    () => `${yearlyProduct?.price?.currencySymbol}${yearlyPricePerWeek.toFixed(2)}`,
    [yearlyPricePerWeek, yearlyProduct?.price?.currencySymbol],
  );

  const secondProduct = isFreeTrialToggle ? trialProduct : weeklyProduct || trialProduct;

  const weeklyPricePerWeekText = useMemo(
    () => `${secondProduct?.price?.currencySymbol}${secondProduct?.price?.amount || 0}`,
    [secondProduct?.price?.amount, secondProduct?.price?.currencySymbol],
  );

  const secondProductText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays = trialProduct?.subscription?.subscriptionPeriod.numberOfUnits;

      return `${offerDays}-${localize('paywall', 'DAY_FREE_TRIAL')}`;
    }

    return `${localize('paywall', 'WEEKLY')} ${localize('paywall', 'ACCESS')}`;
  }, [isFreeTrialToggle, localize, trialProduct?.subscription?.subscriptionPeriod.numberOfUnits]);

  const handleTrialEnabledChanged = useCallback(
    (isEnabled: boolean) => {
      if (isEnabled) {
        onSelectProduct(trialProduct);
      } else if (selectedProduct === trialProduct) {
        onSelectProduct(weeklyProduct);
      }

      setIsFreeTrialToggle(isEnabled);
    },
    [onSelectProduct, selectedProduct, trialProduct, weeklyProduct],
  );

  const handleYearlyProductPress = useCallback(() => {
    onSelectProduct(yearlyProduct);
  }, [onSelectProduct, yearlyProduct]);

  const handleWeeklyProductPress = useCallback(() => {
    onSelectProduct(isFreeTrialToggle ? trialProduct : weeklyProduct);
  }, [isFreeTrialToggle, onSelectProduct, trialProduct, weeklyProduct]);

  return {
    handleTrialEnabledChanged,
    handleWeeklyProductPress,
    handleYearlyProductPress,
    isFreeTrialToggle,
    secondProduct,
    secondProductText,
    weeklyPricePerWeekText,
    yearlyPricePerWeekText,
    yearlyPriceText,
    yearlyProductBenifitText,
  };
};
