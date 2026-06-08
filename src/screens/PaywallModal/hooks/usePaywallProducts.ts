import { useMemo, useState } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';

import { PAYWALL_NAMES } from '../paywallVariantRegistry';

export const usePaywallProducts = (products: AdaptyPaywallProduct[], paywallName: string) => {
  const trialProduct = useMemo(
    () => products.find((product) => !!product.subscription?.offer),
    [products],
  );

  const weeklyProduct = useMemo(
    () =>
      products.find(
        (product) =>
          !product.subscription?.offer && product.price?.amount === trialProduct?.price?.amount,
      ),
    [products, trialProduct?.price?.amount],
  );

  const yearlyProduct = useMemo(
    () =>
      products.find(
        (product) =>
          !product.subscription?.offer &&
          product.price?.amount &&
          trialProduct?.price?.amount &&
          product.price.amount > trialProduct.price.amount,
      ),
    [products, trialProduct?.price?.amount],
  );

  const isTrialEligible = !!trialProduct;

  const defaultSelectedProduct = useMemo(() => {
    const shouldDefaultToTrial =
      paywallName === PAYWALL_NAMES.toggle && remoteConfigService.toggleState && isTrialEligible;

    return shouldDefaultToTrial ? trialProduct : yearlyProduct;
  }, [isTrialEligible, paywallName, trialProduct, yearlyProduct]);

  const [selectedProduct, setSelectedProduct] = useState<AdaptyPaywallProduct | undefined>(
    defaultSelectedProduct,
  );

  const isFreeTrialEnabled = selectedProduct === trialProduct;
  const unlockButtonText = isFreeTrialEnabled
    ? remoteConfigService.buyButtonTextTrial
    : remoteConfigService.buyButtonTextNoTrial;

  return {
    isFreeTrialEnabled,
    isTrialEligible,
    selectedProduct,
    setSelectedProduct,
    trialProduct,
    unlockButtonText,
    weeklyProduct,
    yearlyProduct,
  };
};
