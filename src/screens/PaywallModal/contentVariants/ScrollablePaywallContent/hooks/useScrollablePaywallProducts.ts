import { useCallback, useMemo, useState } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppLocalization } from '@/localization/useAppLocalization';
import {
  formatPriceValue,
  formatProductLocalizedPrice,
  getFreeTrialOfferDays,
  getLocalizedSubscriptionPeriodLabel,
} from '@/screens/PaywallModal/utils/paywallProduct.utils';

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
    () => (yearlyProduct?.price?.amount ?? 0) / WEEKS_IN_YEAR,
    [yearlyProduct?.price?.amount],
  );

  const selectedProductPriceText = useMemo(() => {
    const price = formatProductLocalizedPrice(selectedProduct);
    const period = getLocalizedSubscriptionPeriodLabel(selectedProduct, localize);

    return `${price} /${period}`;
  }, [localize, selectedProduct]);

  const secondProductText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays = getFreeTrialOfferDays(trialProduct);

      return `${offerDays ?? ''}-${localize('paywall', 'DAY_FREE_TRIAL')}`;
    }

    return localize('paywall', 'WEEKLY');
  }, [isFreeTrialToggle, localize, trialProduct]);

  const yearlyPricePerWeekText = useMemo(
    () =>
      `${formatPriceValue(yearlyPricePerWeek, yearlyProduct, 2)} / ${localize('paywall', 'week')}`,
    [localize, yearlyPricePerWeek, yearlyProduct],
  );

  const pricesDiffInPercentsText = useMemo(() => {
    const trialPricePerWeek = trialProduct?.price?.amount ?? 0;

    if (trialPricePerWeek === 0) {
      return '0%';
    }

    const pricesDiffInPercents = Math.round(
      ((trialPricePerWeek - yearlyPricePerWeek) / trialPricePerWeek) * 100,
    );

    return `${pricesDiffInPercents}%`;
  }, [yearlyPricePerWeek, trialProduct?.price?.amount]);

  const secondProduct = isFreeTrialToggle ? trialProduct : weeklyProduct ?? trialProduct;

  const weeklyPricePerWeekText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays = getFreeTrialOfferDays(trialProduct);
      const price = formatProductLocalizedPrice(trialProduct);

      return `${offerDays ?? ''} ${localize('paywall', 'daysFreeThen')} ${price}/${localize(
        'paywall',
        'week',
      )}`;
    }

    return `${formatProductLocalizedPrice(secondProduct)} /${localize('paywall', 'week')}`;
  }, [isFreeTrialToggle, localize, secondProduct, trialProduct]);

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
