import React, { useCallback, useState } from 'react';
import { View, Image } from 'react-native';

import { adapty, AdaptyProfile } from 'react-native-adapty';
import { TouchableHighlight } from 'react-native-gesture-handler';
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

  const { product } = params;
  const { price, subscriptionDetails } = product;

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { handleImageLayout, imageAnimatedStyle } = useImageSlideAnimation(WINDOW_WIDTH);

  const offerDays = subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

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
    setIsLoading(true);

    adapty
      .makePurchase(product)
      .then(unlockFullAccess)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [product, unlockFullAccess]);

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
          locations={[0, 1]}
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
          Try {offerDays} days for free
        </TextView>

        <TextView style={styles.subtitle} type='regular'>
          and discover a library of stories{`\n`}and unique voices
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <View style={styles.separator} />

        <TextView style={styles.promotionTitle} type='regular'>
          Try {offerDays} days free and then{`\n`}
          {price?.localizedString} per week
        </TextView>

        <TextView style={styles.promotionSubtitle} type='regular'>
          The trial version can be canceled at any time
        </TextView>

        <PressableView style={styles.unlockButton} onPress={handleUnlockPress}>
          <TextView style={styles.unlockButtonText} type='bold'>
            Get {offerDays} days free
          </TextView>
        </PressableView>

        <View style={styles.actions}>
          <TouchableHighlight onPress={openTermsAndConditions}>
            <TextView style={styles.action}>Terms</TextView>
          </TouchableHighlight>

          <TouchableHighlight onPress={openPrivacyPolicy}>
            <TextView style={styles.action}>Privacy</TextView>
          </TouchableHighlight>

          <TouchableHighlight onPress={handleRestorePress}>
            <TextView style={styles.action}>Restore</TextView>
          </TouchableHighlight>
        </View>
      </View>

      <AbsoluteSpinnerView show={isLoading} />
    </View>
  );
};
