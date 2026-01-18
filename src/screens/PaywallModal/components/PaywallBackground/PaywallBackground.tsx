import React, { useMemo } from 'react';
import { Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useImageSlideAnimation } from '@/hooks/useImageSlideAnimation';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

import backgroundImage from '../../images/background/background.png';

import scrollableBackground from './images/scrollableBackground/scrollableBackground.png';
import { makeStyles } from './PaywallBackground.styles';

interface PaywallBackgroundProps {
  isScrollable?: boolean;
}

export const PaywallBackground = React.memo(({ isScrollable = false }: PaywallBackgroundProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { windowWidth } = useLayout();

  const topGradientLocations = useMemo(() => [0, 0.8], []);
  const bottomGradientLocations = useMemo(() => [0, 0.5], []);

  const { handleImageLayout, imageAnimatedStyle } = useImageSlideAnimation(windowWidth);

  if (isScrollable) {
    return (
      <>
        <Image source={scrollableBackground} style={styles.image} />
        <LinearGradient
          angle={180}
          colors={[convertHEXtoRGBA('#170432', 0), '#120428']}
          locations={[0, 1]}
          style={styles.scrollableGradient}
        />
      </>
    );
  }

  return (
    <>
      <Animated.Image
        resizeMode='cover'
        source={backgroundImage}
        style={[styles.animatedImage, imageAnimatedStyle]}
        onLayout={handleImageLayout}
      />
      <LinearGradient
        angle={180}
        colors={[colors.opacityLightGradientPurple(0.3), colors.lightGradientPurple]}
        locations={topGradientLocations}
        style={styles.topOverlayGradient}
      />
      <LinearGradient
        angle={180}
        colors={[colors.opacityLightPurple(0), colors.darkGradientPurple]}
        locations={bottomGradientLocations}
        style={styles.bottomOverlayGradient}
      />
    </>
  );
});
