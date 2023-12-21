import { memo, useCallback } from 'react';
import { ImageBackground, View } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import bannerBackgroundImage from './images/bannerBackground/bannerBackground.png';
import { makeStyles } from './PromotionBanner.styles';

export const PromotionBanner = memo(() => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation();

  const handleBannerPress = useCallback(() => {
    navigation.navigate(RootRoutes.PAYWALL_MODAL);
  }, [navigation]);

  return (
    <PressableView onPress={handleBannerPress}>
      <ImageBackground source={bannerBackgroundImage} style={styles.container}>
        <View style={styles.textContainer}>
          <TextView style={styles.title} type='bold'>
            Subscription
          </TextView>
          <TextView style={styles.subtitle}>Free</TextView>
        </View>

        <View style={styles.button}>
          <TextView style={styles.buttonText} type='medium'>
            Upgrade
          </TextView>
        </View>
      </ImageBackground>
    </PressableView>
  );
});
