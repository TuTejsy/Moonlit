import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedReaction } from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './ScrollShadow.styles';

interface Props {
  opacityAnimStyle: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  gradientStyle?: ViewStyle;
}

export const ScrollShadow = ({ gradientStyle, opacityAnimStyle }: Props) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  return (
    <Animated.View style={[styles.gradientContainer, opacityAnimStyle]}>
      <LinearGradient
        angle={180}
        colors={[colors.opacityDarkPurple(1), colors.opacityDarkPurple(0)]}
        locations={[0.3, 1]}
      >
        <LinearGradient
          angle={180}
          colors={[colors.opacityDarkPurple(1), colors.opacityDarkPurple(0)]}
          locations={[0.3, 1]}
        >
          <LinearGradient
            angle={180}
            colors={[colors.opacityDarkPurple(1), colors.opacityDarkPurple(0)]}
            locations={[0.3, 1]}
            style={[gradientStyle, styles.gradient, gradientStyle]}
          />
        </LinearGradient>
      </LinearGradient>
    </Animated.View>
  );
};
