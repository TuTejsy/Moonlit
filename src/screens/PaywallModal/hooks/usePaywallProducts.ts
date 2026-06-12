import { useEffect, useMemo, useState } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';

import { PAYWALL_NAMES, resolvePaywallVariantName } from '../paywallVariantRegistry';
import { resolvePaywallProducts } from '../utils/paywallProduct.utils';

export const usePaywallProducts = (products: AdaptyPaywallProduct[], paywallName: string) => {
  const { trialProduct, weeklyProduct, yearlyProduct } = useMemo(
    () => resolvePaywallProducts(products),
    [products],
  );

  const isTrialEligible = !!trialProduct;

  const defaultSelectedProduct = useMemo(() => {
    const shouldDefaultToTrial =
      resolvePaywallVariantName(paywallName) === PAYWALL_NAMES.toggle &&
      remoteConfigService.toggleState &&
      isTrialEligible;

    return shouldDefaultToTrial ? trialProduct : yearlyProduct;
  }, [isTrialEligible, paywallName, trialProduct, yearlyProduct]);

  const [selectedProduct, setSelectedProduct] = useState<AdaptyPaywallProduct | undefined>(
    defaultSelectedProduct,
  );

  useEffect(() => {
    setSelectedProduct(defaultSelectedProduct);
  }, [defaultSelectedProduct]);

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
