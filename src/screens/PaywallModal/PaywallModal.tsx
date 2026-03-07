import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';

import { AbsoluteSpinnerView } from '@/components/AbsoluteSpinnerView/AbsoluteSpinnerView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import {
  SCROLLABLE_PLACEMENT_ID,
  SELECTION_PLACEMENT_ID,
  SWITCH_PLACEMENT_ID,
} from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';
import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';

import { PaywallBackground } from './components/PaywallBackground/PaywallBackground';
import { ScrollablePaywallContent } from './contentVariants/ScrollablePaywallContent/ScrollablePaywallContent';
import { SelectionPaywallContent } from './contentVariants/SelectionPaywallContent/SelectionPaywallContent';
import { SwitcherPaywallContent } from './contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import { usePaywallActions } from './hooks/usePaywallActions';
import { usePaywallProducts } from './hooks/usePaywallProducts';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const { localize } = useAppLocalization();

  const { contentName, onClose, placementId, products, source, tab } = params;

  const stylesContext = useMemo(
    () => ({
      isScrollable: placementId === SCROLLABLE_PLACEMENT_ID,
    }),
    [placementId],
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
  } = usePaywallProducts(products);

  const { handleRestorePress, handleSkipPress, handleUnlockPress, isLoading } = usePaywallActions({
    contentName,
    isFreeTrialEnabled,
    navigation,
    onClose,
    selectedProduct,
    source,
    tab,
  });

  const renderPaywallContent = useCallback(() => {
    switch (placementId) {
      case SWITCH_PLACEMENT_ID: {
        return (
          <SwitcherPaywallContent
            isFreeTrialEnabled={isFreeTrialEnabled}
            isTrialEligible={isTrialEligible}
            trialProduct={trialProduct}
            unlockButtonText={unlockButtonText}
            yearlyProduct={yearlyProduct}
            onRestorePress={handleRestorePress}
            onSelectProduct={setSelectedProduct}
            onUnlockPress={handleUnlockPress}
          />
        );
      }

      case SELECTION_PLACEMENT_ID: {
        return (
          <SelectionPaywallContent
            isFreeTrialEnabled={isFreeTrialEnabled}
            isTrialEligible={isTrialEligible}
            selectedProduct={selectedProduct}
            trialProduct={trialProduct}
            unlockButtonText={unlockButtonText}
            weeklyProduct={weeklyProduct}
            yearlyProduct={yearlyProduct}
            onRestorePress={handleRestorePress}
            onSelectProduct={setSelectedProduct}
            onUnlockPress={handleUnlockPress}
          />
        );
      }

      case SCROLLABLE_PLACEMENT_ID: {
        return (
          <ScrollablePaywallContent
            isFreeTrialEnabled={isFreeTrialEnabled}
            isTrialEligible={isTrialEligible}
            selectedProduct={selectedProduct}
            trialProduct={trialProduct}
            unlockButtonText={unlockButtonText}
            weeklyProduct={weeklyProduct}
            yearlyProduct={yearlyProduct}
            onRestorePress={handleRestorePress}
            onSelectProduct={setSelectedProduct}
            onUnlockPress={handleUnlockPress}
          />
        );
      }

      default: {
        return null;
      }
    }
  }, [
    handleRestorePress,
    handleUnlockPress,
    isFreeTrialEnabled,
    isTrialEligible,
    placementId,
    selectedProduct,
    setSelectedProduct,
    trialProduct,
    unlockButtonText,
    weeklyProduct,
    yearlyProduct,
  ]);

  useEffect(() => {
    AnalyticsService.logPaywallViewedEvent({
      contentName,
      source,
      tab,
      type: PAYWALL_TYPE.WITH_SWITCHER,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <PaywallBackground isScrollable={placementId === SCROLLABLE_PLACEMENT_ID} />

        {renderPaywallContent()}

        <TextView style={styles.skipText} type='regular' onPress={handleSkipPress}>
          {localize('common', 'skip')}
        </TextView>
      </View>

      <AbsoluteSpinnerView show={isLoading} />
    </View>
  );
};
