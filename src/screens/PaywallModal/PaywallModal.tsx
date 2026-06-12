import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';

import { AbsoluteSpinnerView } from '@/components/AbsoluteSpinnerView/AbsoluteSpinnerView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';

import { PaywallBackground } from './components/PaywallBackground/PaywallBackground';
import { usePaywallActions } from './hooks/usePaywallActions';
import { usePaywallProducts } from './hooks/usePaywallProducts';
import { makeStyles } from './PaywallModal.styles';
import {
  PAYWALL_NAMES,
  resolvePaywallAnalyticsType,
  resolvePaywallVariant,
  resolvePaywallVariantName,
} from './paywallVariantRegistry';

export const PaywallModal = () => {
  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const { localize } = useAppLocalization();

  const { contentName, onClose, paywallName, products, source, tab } = params;

  const resolvedPaywallVariantName = useMemo(
    () => resolvePaywallVariantName(paywallName),
    [paywallName],
  );

  const stylesContext = useMemo(
    () => ({
      isScrollable: resolvedPaywallVariantName === PAYWALL_NAMES.scrollable,
    }),
    [resolvedPaywallVariantName],
  );
  const styles = useMakeStyles(makeStyles, stylesContext);

  const {
    isFreeTrialEnabled,
    isTrialEligible,
    selectedProduct,
    setSelectedProduct,
    trialProduct,
    unlockButtonText,
    weeklyProduct,
    yearlyProduct,
  } = usePaywallProducts(products, paywallName);

  const { handleRestorePress, handleSkipPress, handleUnlockPress, isLoading } = usePaywallActions({
    contentName,
    isFreeTrialEnabled,
    navigation,
    onClose,
    paywallName,
    selectedProduct,
    source,
    tab,
  });

  const PaywallVariant = resolvePaywallVariant(paywallName);

  const variantProps = useMemo(
    () => ({
      isFreeTrialEnabled,
      isTrialEligible,
      onRestorePress: handleRestorePress,
      onSelectProduct: setSelectedProduct,
      onUnlockPress: handleUnlockPress,
      selectedProduct,
      trialProduct,
      unlockButtonText,
      weeklyProduct,
      yearlyProduct,
    }),
    [
      handleRestorePress,
      handleUnlockPress,
      isFreeTrialEnabled,
      isTrialEligible,
      selectedProduct,
      setSelectedProduct,
      trialProduct,
      unlockButtonText,
      weeklyProduct,
      yearlyProduct,
    ],
  );

  const renderPaywallContent = useCallback(() => {
    return <PaywallVariant {...variantProps} />;
  }, [PaywallVariant, variantProps]);

  useEffect(() => {
    AnalyticsService.logPaywallViewedEvent({
      contentName,
      source,
      tab,
      type: resolvePaywallAnalyticsType(paywallName),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <PaywallBackground isScrollable={resolvedPaywallVariantName === PAYWALL_NAMES.scrollable} />

        {renderPaywallContent()}

        <TextView style={styles.skipText} type='regular' onPress={handleSkipPress}>
          {localize('common', 'skip')}
        </TextView>
      </View>

      <AbsoluteSpinnerView show={isLoading} />
    </View>
  );
};
