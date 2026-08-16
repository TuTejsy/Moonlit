import { useCallback, useMemo } from 'react';

import type { AdaptyPaywallProduct } from 'react-native-adapty';

import { useAppLocalization } from '@/localization/useAppLocalization';
import {
  formatProductLocalizedPrice,
  formatPriceValue,
  getFreeTrialOfferDays,
} from '@/screens/PaywallModal/utils/paywallProduct.utils';

const WEEKS_IN_YEAR = 52;

export interface UseStaticDefaultProdPaywallProductsProps {
  isFreeTrialEnabled: boolean;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export interface StaticDefaultProdPaywallProductsResult {
  ctaLabel: string;
  dueTodayText: string;
  handleSelectWeekly: () => void;
  handleSelectYearly: () => void;
  trialDays: number | undefined;
  weeklyIsSelected: boolean;
  weeklyPriceText: string;
  yearlyDetailText: string;
  yearlyIsSelected: boolean;
  yearlyPerWeekText: string;
  yearlyPriceText: string;
}

export const useStaticDefaultProdPaywallProducts = ({
  isFreeTrialEnabled,
  onSelectProduct,
  selectedProduct,
  trialProduct,
  weeklyProduct,
  yearlyProduct,
}: UseStaticDefaultProdPaywallProductsProps): StaticDefaultProdPaywallProductsResult => {
  const { localize } = useAppLocalization();

  const weeklyIsSelected = isFreeTrialEnabled
    ? selectedProduct === trialProduct
    : selectedProduct === weeklyProduct;

  const yearlyIsSelected = selectedProduct === yearlyProduct;

  const weeklyPriceText = useMemo(
    () => formatProductLocalizedPrice(isFreeTrialEnabled ? trialProduct : weeklyProduct),
    [isFreeTrialEnabled, trialProduct, weeklyProduct],
  );

  const yearlyPricePerWeek = useMemo(
    () => (yearlyProduct?.price?.amount ?? 0) / WEEKS_IN_YEAR,
    [yearlyProduct],
  );

  const yearlyPerWeekText = useMemo(
    () => formatPriceValue(yearlyPricePerWeek, yearlyProduct, 2),
    [yearlyPricePerWeek, yearlyProduct],
  );

  const yearlyPriceText = useMemo(
    () => formatProductLocalizedPrice(yearlyProduct),
    [yearlyProduct],
  );

  const trialDays = useMemo(() => getFreeTrialOfferDays(trialProduct), [trialProduct]);

  const dueTodayText = useMemo(
    () =>
      localize('paywall', 'staticDefaultProdDueTodayTemplate', {
        data: formatPriceValue(0, trialProduct, 2),
      }),
    [localize, trialProduct],
  );

  const yearlyDetailText = useMemo(
    () => localize('paywall', 'staticDefaultProdPlanYearlyDetail', { data: yearlyPriceText }),
    [localize, yearlyPriceText],
  );

  const ctaLabel = useMemo(() => localize('paywall', 'staticDefaultProdCtaLabel'), [localize]);

  const handleSelectWeekly = useCallback(() => {
    onSelectProduct(isFreeTrialEnabled ? trialProduct : weeklyProduct);
  }, [isFreeTrialEnabled, onSelectProduct, trialProduct, weeklyProduct]);

  const handleSelectYearly = useCallback(() => {
    onSelectProduct(yearlyProduct);
  }, [onSelectProduct, yearlyProduct]);

  return {
    ctaLabel,
    dueTodayText,
    handleSelectWeekly,
    handleSelectYearly,
    trialDays,
    weeklyIsSelected,
    weeklyPriceText,
    yearlyDetailText,
    yearlyIsSelected,
    yearlyPerWeekText,
    yearlyPriceText,
  };
};
