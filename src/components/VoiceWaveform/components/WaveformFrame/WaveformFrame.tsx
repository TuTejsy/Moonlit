import React, { useMemo } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './WaveformFrame.styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface WaveformFramePropTypes {
  color: string;
  delay: number;
  maxHeight: number;
  minHeight: number;
  voicePowerSharedValue: SharedValue<number>;
  gradientColors?: string[];
  opacity?: number;
}

function WaveformFrame({
  color,
  delay,
  maxHeight,
  minHeight,
  opacity,
  voicePowerSharedValue,
  gradientColors,
}: WaveformFramePropTypes) {
  const stylesContext = useMemo(
    () => ({ color, maxHeight, minHeight, opacity }),
    [color, maxHeight, minHeight, opacity],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withDelay(
        delay,
        withTiming(interpolate(voicePowerSharedValue.value, [1, 6], [minHeight, maxHeight])),
      ),
    };
  });

  if (gradientColors) {
    return (
      <AnimatedLinearGradient
        colors={gradientColors}
        style={[styles.waveformGradientFrame, animatedStyles]}
      />
    );
  }

  return <Animated.View style={[styles.waveformFrame, animatedStyles]} />;
}

export default WaveformFrame;
