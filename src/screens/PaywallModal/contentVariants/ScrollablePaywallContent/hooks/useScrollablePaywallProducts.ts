import { useCallback, useMemo, useState } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppLocalization } from '@/localization/useAppLocalization';

import { WEEKS_IN_YEAR } from '../ScrollablePaywallContent.constants';

interface UseScrollablePaywallProductsProps {
  isFreeTrialEnabled: boolean;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const useScrollablePaywallProducts = ({
  isFreeTrialEnabled,
  onSelectProduct,
  selectedProduct,
  trialProduct,
  weeklyProduct,
  yearlyProduct,
}: UseScrollablePaywallProductsProps) => {
  const [isFreeTrialToggle, setIsFreeTrialToggle] = useState(isFreeTrialEnabled);
  const { localize } = useAppLocalization();

  const yearlyPricePerWeek = useMemo(
    () => (yearlyProduct?.price?.amount || 0) / WEEKS_IN_YEAR,
    [yearlyProduct?.price?.amount],
  );

  const selectedProductPriceText = useMemo(() => {
    const period = selectedProduct?.subscription?.localizedSubscriptionPeriod?.replace('1 ', '');

    return `${selectedProduct?.price?.currencySymbol}${
      selectedProduct?.price?.amount || 0
    } /${period}`;
  }, [
    selectedProduct?.price?.amount,
    selectedProduct?.price?.currencySymbol,
    selectedProduct?.subscription?.localizedSubscriptionPeriod,
  ]);

  const secondProductText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays = trialProduct?.subscription?.subscriptionPeriod.numberOfUnits;

      return `${offerDays}-${localize('paywall', 'DAY_FREE_TRIAL')}`;
    }

    return localize('paywall', 'WEEKLY');
  }, [isFreeTrialToggle, localize, trialProduct?.subscription?.subscriptionPeriod.numberOfUnits]);

  const yearlyPricePerWeekText = useMemo(
    () =>
      `${yearlyProduct?.price?.currencySymbol}${yearlyPricePerWeek.toFixed(2)} / ${localize(
        'paywall',
        'week',
      )}`,
    [localize, yearlyPricePerWeek, yearlyProduct?.price?.currencySymbol],
  );

  const pricesDiffInPercentsText = useMemo(() => {
    const trialPricePerWeek = trialProduct?.price?.amount || 0;

    const pricesDiffInPercents = Math.round(
      ((trialPricePerWeek - yearlyPricePerWeek) / trialPricePerWeek) * 100,
    );

    return `${pricesDiffInPercents}%`;
  }, [yearlyPricePerWeek, trialProduct?.price?.amount]);

  const secondProduct = isFreeTrialToggle ? trialProduct : weeklyProduct || trialProduct;

  const weeklyPricePerWeekText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays = trialProduct?.subscription?.subscriptionPeriod.numberOfUnits;

      const price = trialProduct?.price?.amount;
      const currencySymbol = trialProduct?.price?.currencySymbol;

      return `${offerDays} ${localize(
        'paywall',
        'daysFreeThen',
      )} ${currencySymbol}${price}/${localize('paywall', 'week')}`;
    }

    return `${secondProduct?.price?.currencySymbol}${secondProduct?.price?.amount || 0} /${localize(
      'paywall',
      'week',
    )}`;
  }, [
    isFreeTrialToggle,
    secondProduct?.price?.currencySymbol,
    secondProduct?.price?.amount,
    localize,
    trialProduct?.subscription?.subscriptionPeriod.numberOfUnits,
    trialProduct?.price?.amount,
    trialProduct?.price?.currencySymbol,
  ]);

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
    pricesDiffInPercentsText,
    secondProduct,
    secondProductText,
    selectedProductPriceText,
    weeklyPricePerWeekText,
    yearlyPricePerWeekText,
  };
};
