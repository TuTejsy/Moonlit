import React, { useCallback } from 'react';
import { ImageBackground, View, Image } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import backgroundImage from './images/background/background.png';
import voicesImage from './images/voices/voices.png';
import { makeStyles } from './PaywallModal.styles';

export const PaywallModal = () => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<RootRoutes.PAYWALL_MODAL>();

  const handleSkipPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ImageBackground source={backgroundImage} style={styles.content}>
        <TextView style={styles.skipText} type='regular' onPress={handleSkipPress}>
          Skip
        </TextView>

        <TextView style={styles.title} type='bold'>
          Try 3 days for free
        </TextView>

        <TextView style={styles.subtitle} type='regular'>
          and discover a library of stories{`\n`}and unique voices
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <View style={styles.separator} />

        <TextView style={styles.promotionTitle} type='regular'>
          Try 3 days free and then{`\n`}$5.99 per week
        </TextView>

        <TextView style={styles.promotionSubtitle} type='regular'>
          The trial version can be canceled at any time
        </TextView>

        <PressableView style={styles.unlockButton}>
          <TextView style={styles.unlockButtonText} type='bold'>
            Get 3 days free
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
