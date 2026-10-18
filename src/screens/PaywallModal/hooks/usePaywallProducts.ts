import { useEffect, useMemo, useState } from 'react';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { PAYWALL_NAMES, resolvePaywallVariantName } from '../paywallVariantRegistry';
import { resolvePaywallProducts } from '../utils/paywallProduct.utils';
import { type PaywallRemoteConfig } from '../utils/paywallRemoteConfig.utils';

export const usePaywallProducts = (
  products: AdaptyPaywallProduct[],
  paywallName: string,
  remoteConfig: PaywallRemoteConfig,
) => {
  const { trialProduct, weeklyProduct, yearlyProduct } = useMemo(
    () => resolvePaywallProducts(products),
    [products],
  );

  const isTrialEligible = !!trialProduct;

  const defaultSelectedProduct = useMemo(() => {
    const shouldDefaultToTrial =
      resolvePaywallVariantName(paywallName) === PAYWALL_NAMES.toggle &&
      remoteConfig.toggleState &&
      isTrialEligible;

    return shouldDefaultToTrial ? trialProduct : yearlyProduct;
  }, [isTrialEligible, paywallName, remoteConfig.toggleState, trialProduct, yearlyProduct]);

  const [selectedProduct, setSelectedProduct] = useState<AdaptyPaywallProduct | undefined>(
    defaultSelectedProduct,
  );

  useEffect(() => {
    setSelectedProduct(defaultSelectedProduct);
  }, [defaultSelectedProduct]);

  const isFreeTrialEnabled = selectedProduct === trialProduct;
  const unlockButtonText = isFreeTrialEnabled
    ? remoteConfig.buyButtonTextTrial
    : remoteConfig.buyButtonTextNoTrial;

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
