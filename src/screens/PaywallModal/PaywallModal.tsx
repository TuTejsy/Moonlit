import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { adapty, AdaptyPaywallProduct, AdaptyProfile } from 'react-native-adapty';

import { AbsoluteSpinnerView } from '@/components/AbsoluteSpinnerView/AbsoluteSpinnerView';
import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';
import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';
import { unlockFullVersion } from '@/store/user/user.slice';

import { FooterActions } from './components/FooterActions/FooterActions';
import { PaywallBackground } from './components/PaywallBackground/PaywallBackground';
import { SwitcherPaywallContent } from './contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const { contentName, onClose, products, source, tab } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [isFreeTrialEnabled, setIsFreeTrialEnabled] = useState(false);

  const dispatch = useAppDispatch();

  const trialProduct = useMemo(
    () => products.find((product) => !!product.subscriptionDetails?.introductoryOffers?.length),
    [products],
  );

  const fullProduct = useMemo(
    () => products.find((product) => !product.subscriptionDetails?.introductoryOffers?.length),
    [products],
  );

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
    const product = isFreeTrialEnabled ? trialProduct : fullProduct;

    if (product) {
      setIsLoading(true);

      adapty
        .makePurchase(product)
        .then(makeUnlockFullAccess(product))
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fullProduct, isFreeTrialEnabled, makeUnlockFullAccess, trialProduct]);

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

        <SwitcherPaywallContent
          fullProduct={fullProduct}
          isFreeTrialEnabled={isFreeTrialEnabled}
          trialProduct={trialProduct}
          onTrialEnabledChanged={setIsFreeTrialEnabled}
        />

        <GradientButton style={styles.button} onPress={handleUnlockPress}>
          Begin your adventure
        </GradientButton>

        <FooterActions onRestorePress={handleRestorePress} />
      </View>

      <AbsoluteSpinnerView show={isLoading} />
    </View>
  );
};
