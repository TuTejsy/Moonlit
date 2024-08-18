import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useImageSlideAnimation } from '@/hooks/useImageSlideAnimation';

import backgroundImage from '../../images/background/background.png';

import { makeStyles } from './PaywallBackground.styles';

interface PaywallBackgroundProps {
  bottomGradientLocations?: number[] | undefined;
  topGradientLocations?: number[] | undefined;
}

export const PaywallBackground = React.memo(
  ({ bottomGradientLocations, topGradientLocations }: PaywallBackgroundProps) => {
    const styles = useMakeStyles(makeStyles);
    const { colors } = useTheme();
    const { windowWidth } = useLayout();

    const { handleImageLayout, imageAnimatedStyle } = useImageSlideAnimation(windowWidth);

    return (
      <>
        <Animated.Image
          resizeMode='cover'
          source={backgroundImage}
          style={[styles.image, imageAnimatedStyle]}
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
  },
);
