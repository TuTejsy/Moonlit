import React from 'react';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './WaveformFrame.styles';

interface WaveformFramePropTypes {
  color: string;
  index: number;
  maxHeight: number;
  minHeight: number;
  voicePowerSharedValue: SharedValue<number>;
  opacity?: number;
}

function WaveformFrame({
  color,
  index,
  maxHeight,
  minHeight,
  opacity,
  voicePowerSharedValue,
}: WaveformFramePropTypes) {
  const styles = useMakeStyles(makeStyles, { color, maxHeight, minHeight, opacity });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withDelay(index * 50, withTiming(voicePowerSharedValue.value)),
    };
  });

  return <Animated.View style={[styles.waveformFrame, animatedStyles]} />;
}

export default WaveformFrame;
