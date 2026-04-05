import React from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './RecordingProgressBar.styles';
import { RecordingProgressBarProps } from './RecordingProgressBar.types';
import { useLayout } from '@/hooks/theme/useLayout';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const PROGRESS_ANIMATION_DURATION = 500;

export const RecordingProgressBar = ({ progress }: RecordingProgressBarProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { windowWidth, horizontalPadding } = useLayout();

  const animatedFilledStyle = useAnimatedStyle(() => ({
    width: withTiming(progress * (windowWidth - horizontalPadding * 2), {
      duration: PROGRESS_ANIMATION_DURATION,
    }),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.track} />
      <AnimatedLinearGradient
        useAngle
        angle={102}
        colors={[colors.gradientButtonStart, colors.gradientButtonMiddle, colors.gradientButtonEnd]}
        locations={[0.05, 0.54, 1]}
        style={[styles.filledTrack, animatedFilledStyle]}
      />
    </View>
  );
};
