import React, { useCallback } from 'react';
import { ImageBackground, View, Image } from 'react-native';

import { adapty, AdaptyProfile } from 'react-native-adapty';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { unlockFullVersion } from '@/store/user/user.slice';

import backgroundImage from './images/background/background.png';
import voicesImage from './images/voices/voices.png';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const { product } = params;
  const { price, subscriptionDetails } = product;

  const dispatch = useAppDispatch();

  const offerDays = subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

  const unlockFullAccess = useCallback(
    (profile: AdaptyProfile) => {
      console.log('profile: ', profile);
      const isSubscribed = profile.accessLevels?.premium?.isActive;

      if (isSubscribed) {
        dispatch(unlockFullVersion);
        navigation.goBack();
      }
    },
    [dispatch, navigation],
  );

  const handleSkipPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUnlockPress = useCallback(() => {
    adapty.makePurchase(product).then(unlockFullAccess).catch(console.error);
  }, [product, unlockFullAccess]);

  const handleRestorePress = useCallback(() => {
    adapty.restorePurchases().then(unlockFullAccess).catch(console.error);
  }, [unlockFullAccess]);

  return (
    <View style={styles.screen}>
      <ImageBackground source={backgroundImage} style={styles.content}>
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
          <TextView style={styles.action}>Terms</TextView>
          <TextView style={styles.action}>Privacy</TextView>
          <TextView style={styles.action} onPress={handleRestorePress}>
            Restore
          </TextView>
        </View>
      </ImageBackground>
    </View>
  );
};
