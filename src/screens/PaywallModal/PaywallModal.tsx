import React, { useCallback, useEffect, useMemo } from 'react';
import { ImageBackground, View, Image } from 'react-native';

import { requestSubscription } from 'react-native-iap';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';

import backgroundImage from './images/background/background.png';
import voicesImage from './images/voices/voices.png';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();
  const { params } = useAppRoute<RootRoutes.PAYWALL_MODAL>();

  const isFullVersion = useAppSelector(selectIsFullVersion);

  const {
    subscription: {
      introductoryPriceNumberOfPeriodsIOS,
      localizedPrice,
      productId,
      subscriptionPeriodUnitIOS,
    },
  } = params;

  const formattedSubscriptionPeriod = useMemo(
    () => subscriptionPeriodUnitIOS?.toLocaleLowerCase(),
    [subscriptionPeriodUnitIOS],
  );

  const handleSkipPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUnlockPress = useCallback(() => {
    requestSubscription({ sku: productId });
  }, [productId]);

  useEffect(() => {
    if (isFullVersion) {
      navigation.goBack();
    }
  }, [isFullVersion, navigation]);

  return (
    <View style={styles.screen}>
      <ImageBackground source={backgroundImage} style={styles.content}>
        <TextView style={styles.skipText} type='regular' onPress={handleSkipPress}>
          Skip
        </TextView>

        <TextView style={styles.title} type='bold'>
          Try {introductoryPriceNumberOfPeriodsIOS} days for free
        </TextView>

        <TextView style={styles.subtitle} type='regular'>
          and discover a library of stories{`\n`}and unique voices
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <View style={styles.separator} />

        <TextView style={styles.promotionTitle} type='regular'>
          Try {introductoryPriceNumberOfPeriodsIOS} days free and then{`\n`}
          {localizedPrice} per {formattedSubscriptionPeriod}
        </TextView>

        <TextView style={styles.promotionSubtitle} type='regular'>
          The trial version can be canceled at any time
        </TextView>

        <PressableView style={styles.unlockButton} onPress={handleUnlockPress}>
          <TextView style={styles.unlockButtonText} type='bold'>
            Get {introductoryPriceNumberOfPeriodsIOS} days free
          </TextView>
        </PressableView>

        <View style={styles.actions}>
          <TextView style={styles.action}>Terms</TextView>
          <TextView style={styles.action}>Privacy</TextView>
          <TextView style={styles.action}>Restore</TextView>
        </View>
      </ImageBackground>
    </View>
  );
};
