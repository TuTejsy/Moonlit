import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, ViewProps, LayoutChangeEvent } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { UnlockButton } from '../Buttons/UnlockButton/UnlockButton';
import { PressableView } from '../Primitives/PressableView/PressableView';
import { TextView } from '../Primitives/TextView/TextView';

import bannerImage from './images/banner/banner.png';
import voicesImage from './images/voices/voices.png';
import { PROMOTION_BANNER_WIDTH } from './PromotionBanner.constants';
import { makeStyles } from './PromotionBanner.styles';

interface PromotionBannerPropTypes extends ViewProps {}

export function PromotionBanner({ style }: PromotionBannerPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const [imageWidth, setImageWidth] = useState(0);

  const imageTranslateXSharedValue = useSharedValue(0);

  const handleImageLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setImageWidth(width);
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: imageTranslateXSharedValue.value }],
  }));

  const { showPaywallModal } = useShowPaywallModal();

  useEffect(() => {
    if (imageWidth > PROMOTION_BANNER_WIDTH && imageTranslateXSharedValue.value === 0) {
      const widthDiff = imageWidth - PROMOTION_BANNER_WIDTH;

      imageTranslateXSharedValue.value = withRepeat(
        withTiming(-(imageWidth - PROMOTION_BANNER_WIDTH), {
          duration: widthDiff * 100,
        }),
        -1,
        true,
      );
    }
  }, [imageTranslateXSharedValue, imageTranslateXSharedValue.value, imageWidth]);

  return (
    <PressableView style={[styles.container, style]} onPress={showPaywallModal}>
      <Animated.Image
        resizeMode='cover'
        source={bannerImage}
        style={[styles.image, imageAnimatedStyle]}
        onLayout={handleImageLayout}
      />
      <LinearGradient
        angle={180}
        colors={[colors.opacityLightPurple(0), colors.opacityLightPurple(1)]}
        locations={[0, 1]}
        style={styles.imageGradient}
      />

      <View style={styles.content}>
        <TextView style={styles.title} type='bold'>
          Try 3 days{'\n'}for free
        </TextView>
        <TextView style={styles.subtitle}>
          and discover a library{'\n'}of stories and unique voiceovers
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <UnlockButton>Get 3 days free</UnlockButton>
      </View>
    </PressableView>
  );
}
