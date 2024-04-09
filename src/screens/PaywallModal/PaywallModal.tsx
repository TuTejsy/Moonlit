import React, { useCallback, useMemo, useState } from 'react';
import { View, Image, Switch } from 'react-native';

import { adapty, AdaptyProfile } from 'react-native-adapty';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { AbsoluteSpinnerView } from '@/components/AbsoluteSpinnerView/AbsoluteSpinnerView';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { WINDOW_WIDTH } from '@/constants/layout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useImageSlideAnimation } from '@/hooks/useImageSlideAnimation';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { unlockFullVersion } from '@/store/user/user.slice';
import { openPrivacyPolicy } from '@/utils/documents/openPrivacyPolicy';
import { openTermsAndConditions } from '@/utils/documents/openTermsAndConditions';

import backgroundImage from './images/background/background.png';
import voicesImage from './images/voices/voices.png';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const { products } = params;

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

  const productText = useMemo(() => {
    if (isFreeTrialEnabled) {
      const offerDays =
        trialProduct?.subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

      const price = trialProduct?.price?.amount;
      const currencyCode = trialProduct?.price?.currencyCode;

      return `${offerDays} days free, then ${price} ${currencyCode}/week`;
    }
    const price = fullProduct?.price?.amount;
    const currencyCode = fullProduct?.price?.currencyCode;

    const subscriptionPeriod = fullProduct?.subscriptionDetails?.subscriptionPeriod.unit;

    return `Try it now, just ${price} ${currencyCode}/${subscriptionPeriod}`;
  }, [
    fullProduct?.price?.amount,
    fullProduct?.price?.currencyCode,
    fullProduct?.subscriptionDetails?.subscriptionPeriod.unit,
    isFreeTrialEnabled,
    trialProduct?.price?.amount,
    trialProduct?.price?.currencyCode,
    trialProduct?.subscriptionDetails?.introductoryOffers,
  ]);

  const { handleImageLayout, imageAnimatedStyle } = useImageSlideAnimation(WINDOW_WIDTH);

  const unlockFullAccess = useCallback(
    (profile: AdaptyProfile) => {
      const isSubscribed = profile.accessLevels?.premium?.isActive;

      if (isSubscribed) {
        dispatch(unlockFullVersion());
        navigation.goBack();
      }
    },
    [dispatch, navigation],
  );

  const handleSkipPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUnlockPress = useCallback(() => {
    const product = isFreeTrialEnabled ? trialProduct : fullProduct;

    if (product) {
      setIsLoading(true);

      adapty
        .makePurchase(product)
        .then(unlockFullAccess)
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fullProduct, isFreeTrialEnabled, trialProduct, unlockFullAccess]);

  const handleRestorePress = useCallback(() => {
    setIsLoading(true);

    adapty
      .restorePurchases()
      .then(unlockFullAccess)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [unlockFullAccess]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Animated.Image
          resizeMode='cover'
          source={backgroundImage}
          style={[styles.image, imageAnimatedStyle]}
          onLayout={handleImageLayout}
        />
        <LinearGradient
          angle={180}
          colors={[colors.opacityLightGradientPurple(0.3), colors.lightGradientPurple]}
          locations={[0, 0.8]}
          style={styles.topOverlayGradient}
        />
        <LinearGradient
          angle={180}
          colors={[colors.opacityLightPurple(0), colors.darkGradientPurple]}
          locations={[0, 0.5]}
          style={styles.bottomOverlayGradient}
        />

        <TextView style={styles.skipText} type='regular' onPress={handleSkipPress}>
          Skip
        </TextView>

        <TextView style={styles.title} type='bold'>
          Get access to{`\n`}all tales
        </TextView>

        <TextView style={styles.subtitle} type='regular'>
          Discover unique voices and{`\n`}listen classic fary tales
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <TextView style={styles.promotionText} type='regular'>
          {productText}
          {`\n`}
          Auto-renewable. Cancel anytime
        </TextView>

        <View style={styles.freeTrialContainer}>
          <View style={styles.freeTrialTextContainer}>
            <TextView style={styles.freeTrialTitle} type='bold'>
              Not shure yet
            </TextView>
            <TextView style={styles.freeTrialSubtitle}>Enable free trial</TextView>
          </View>

          <Switch
            style={styles.freeTrialSwitch}
            value={isFreeTrialEnabled}
            trackColor={{
              false: colors.opacityWhite(0.2),
              true: colors.unlockButtonGradientStart,
            }}
            onValueChange={setIsFreeTrialEnabled}
          />
        </View>

        <PressableView style={styles.unlockButton} onPress={handleUnlockPress}>
          <LinearGradient
            useAngle
            angle={45}
            locations={[0, 0.5, 1]}
            style={styles.unlockButtonGradient}
            colors={[
              colors.unlockButtonGradientStart,
              colors.unlockButtonGradientMiddle,
              colors.unlockButtonGradientEnd,
            ]}
          >
            <TextView style={styles.unlockButtonText} type='bold'>
              Go to listen stories
            </TextView>
          </LinearGradient>
        </PressableView>

        <View style={styles.actions}>
          <TouchableOpacity onPress={openTermsAndConditions}>
            <TextView style={styles.action}>Terms</TextView>
          </TouchableOpacity>

          <TouchableOpacity onPress={openPrivacyPolicy}>
            <TextView style={styles.action}>Privacy</TextView>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRestorePress}>
            <TextView style={styles.action}>Restore</TextView>
          </TouchableOpacity>
        </View>
      </View>

      <AbsoluteSpinnerView show={isLoading} />
    </View>
  );
};
