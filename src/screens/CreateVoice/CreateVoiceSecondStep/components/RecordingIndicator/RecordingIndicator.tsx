import React, { useEffect } from 'react';
import { View } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './RecordingIndicator.styles';
import { RecordingIndicatorProps } from './RecordingIndicator.types';

const BLINK_DURATION = 600;

export const RecordingIndicator = ({ formattedTime, totalDuration }: RecordingIndicatorProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  const dotOpacity = useSharedValue(1);

  useEffect(() => {
    dotOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: BLINK_DURATION, easing: Easing.inOut(Easing.cubic) }),
        withTiming(1, { duration: BLINK_DURATION, easing: Easing.inOut(Easing.cubic) }),
      ),
      -1,
      false,
    );
  }, [dotOpacity]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Animated.View style={[styles.dot, animatedDotStyle]} />
        <TextView style={styles.recordingText} type='medium'>
          {localize('createVoice', 'recording')}
        </TextView>
      </View>
      <View style={styles.timeContainer}>
        <TextView style={styles.timeText} type='medium'>
          {formattedTime}
        </TextView>
        <TextView style={styles.totalDurationText} type='medium'>
          {` / ${totalDuration}`}
        </TextView>
      </View>
    </View>
  );
};
