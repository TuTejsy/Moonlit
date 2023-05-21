import React, { useMemo } from 'react';

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './WaveformFrame.styles';

interface WaveformFramePropTypes {
  color: string;
  delay: number;
  maxHeight: number;
  minHeight: number;
  voicePowerSharedValue: SharedValue<number>;
  opacity?: number;
}

function WaveformFrame({
  color,
  delay,
  maxHeight,
  minHeight,
  opacity,
  voicePowerSharedValue,
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

  return <Animated.View style={[styles.waveformFrame, animatedStyles]} />;
}

export default WaveformFrame;
