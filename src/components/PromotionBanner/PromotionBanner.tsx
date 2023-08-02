import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, ViewProps, LayoutChangeEvent } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { TextView } from '../Primitives/TextView/TextView';

import bannerImage from './images/banner/banner.png';
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

  useEffect(() => {
    if (imageWidth > PROMOTION_BANNER_WIDTH && imageTranslateXSharedValue.value === 0) {
      const widthDiff = imageWidth - PROMOTION_BANNER_WIDTH;
      console.log('widthDiff: ', widthDiff);

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
    <View style={[styles.container, style]}>
      <Animated.Image
        resizeMode='cover'
        source={bannerImage}
        style={[styles.image, imageAnimatedStyle]}
        onLayout={handleImageLayout}
      />

      <LinearGradient
        angle={180}
        colors={[colors.opacityOrange(0), colors.opacityOrange(1)]}
        locations={[0.3, 0.85]}
        style={styles.content}
      >
        <TextView style={styles.title} type='bold'>
          Your Special{'\n'}Welcome Offer
        </TextView>
        <TextView style={styles.subtitle}>Get 40% Off - Today only</TextView>

        <View style={styles.button}>
          <TextView style={styles.buttonText} type='bold'>
            Unlock FairyVoice+
          </TextView>
        </View>
      </LinearGradient>
    </View>
  );
}
