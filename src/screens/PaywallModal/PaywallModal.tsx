import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { adapty, AdaptyPaywallProduct, AdaptyProfile, OfferEligibility } from 'react-native-adapty';

import { AbsoluteSpinnerView } from '@/components/AbsoluteSpinnerView/AbsoluteSpinnerView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SELECTION_PLACEMENT_ID, SWITCH_PLACEMENT_ID } from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';
import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';
import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';
import { unlockFullVersion } from '@/store/user/user.slice';

import { PaywallBackground } from './components/PaywallBackground/PaywallBackground';
import { SelectionPaywallContent } from './contentVariants/SelectionPaywallContent/SelectionPaywallContent';
import { SwitcherPaywallContent } from './contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const { contentName, onClose, placementId, products, productsOffersEligibility, source, tab } =
    params;

  const dispatch = useAppDispatch();

  const trialProduct = useMemo(
    () => products.find((product) => !!product.subscriptionDetails?.introductoryOffers?.length),
    [products],
  );

  const weeklyProduct = useMemo(
    () =>
      products.find(
        (product) =>
          !product.subscriptionDetails?.introductoryOffers?.length &&
          product.price?.amount === trialProduct?.price?.amount,
      ),
    [products, trialProduct?.price?.amount],
  );

  const yearlyProduct = useMemo(
    () =>
      products.find(
        (product) =>
          !product.subscriptionDetails?.introductoryOffers?.length &&
          product.price?.amount &&
          trialProduct?.price?.amount &&
          product.price.amount > trialProduct.price.amount,
      ),
    [products, trialProduct?.price?.amount],
  );

  const isTrialEligible =
    !!trialProduct &&
    productsOffersEligibility[trialProduct.vendorProductId] === OfferEligibility.Eligible;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdaptyPaywallProduct | undefined>(
    remoteConfigService.toggleState && isTrialEligible ? trialProduct : yearlyProduct,
  );

  const isFreeTrialEnabled = selectedProduct === trialProduct;
  const unlockButtonText = isFreeTrialEnabled
    ? remoteConfigService.buyButtonTextTrial
    : remoteConfigService.buyButtonTextNoTrial;

  const topGradientLocations = useMemo(() => [0, 0.8], []);
  const bottomGradientLocations = useMemo(() => [0, 0.5], []);

  const makeUnlockFullAccess = useCallback(
    (product: AdaptyPaywallProduct | null) => (profile: AdaptyProfile) => {
      const isSubscribed = profile.accessLevels?.premium?.isActive;

      if (isSubscribed) {
        dispatch(unlockFullVersion());
        AnalyticsService.setIsUserPaid(true);

        if (product) {
          AnalyticsService.logStartSubscriptionEvent({
            contentName,
            hasTrial: isFreeTrialEnabled,
            productId: product.vendorProductId,
            source,
            tab,
            type: PAYWALL_TYPE.WITH_SWITCHER,
          });
        }

        if (onClose) {
          onClose();
        } else {
          navigation.goBack();
        }
      }
    },
    [contentName, dispatch, isFreeTrialEnabled, navigation, onClose, source, tab],
  );

  const handleSkipPress = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }

    AnalyticsService.logPaywallClosedEvent({
      contentName,
      source,
      tab,
      type: PAYWALL_TYPE.WITH_SWITCHER,
    });
  }, [contentName, navigation, onClose, source, tab]);

  const handleUnlockPress = useCallback(() => {
    if (selectedProduct) {
      setIsLoading(true);

      adapty
        .makePurchase(selectedProduct)
        .then(makeUnlockFullAccess(selectedProduct))
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [makeUnlockFullAccess, selectedProduct]);

  const handleRestorePress = useCallback(() => {
    setIsLoading(true);

    adapty
      .restorePurchases()
      .then(makeUnlockFullAccess(null))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [makeUnlockFullAccess]);

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
        <PaywallBackground
          bottomGradientLocations={bottomGradientLocations}
          topGradientLocations={topGradientLocations}
        />

        <TextView style={styles.skipText} type='regular' onPress={handleSkipPress}>
          Skip
        </TextView>

        {renderPaywallContent()}
      </View>

      <AbsoluteSpinnerView show={isLoading} />
    </View>
  );
};
