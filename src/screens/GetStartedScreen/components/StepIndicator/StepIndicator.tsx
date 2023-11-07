import { memo } from 'react';

import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './StepIndicator.styles';

interface StepIndicatorProps {
  currentStepSharedValue: SharedValue<number>;
  maxStep: number;
  step: number;
}

export const StepIndicator = memo(
  ({ currentStepSharedValue, maxStep, step }: StepIndicatorProps) => {
    const styles = useMakeStyles(makeStyles);

    const stepIndicatorAnimatedStyle = useAnimatedStyle(() => {
      if (step === 0) {
        return {
          opacity: interpolate(currentStepSharedValue.value, [0, maxStep], [1, 0.5]),
        };
      }

      if (step === maxStep) {
        return { opacity: interpolate(currentStepSharedValue.value, [0, maxStep], [0.5, 1]) };
      }

      return {
        opacity: interpolate(currentStepSharedValue.value, [0, step, maxStep], [0.5, 1, 0.5]),
      };
    });

    return <Animated.View style={[styles.indicator, stepIndicatorAnimatedStyle]} />;
  },
);
