import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { View, ViewProps } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import useMutableValue from '@/hooks/useMutableValue';
import formatSecondsToDuration from '@/utils/formatters/formatSecondsToDuration';

import useProgressBarGestureHandler from './hooks/useProgressBarGestureHandler';
import { makeStyles } from './ProgressBar.styles';

interface ProgressBarPropTypes extends ViewProps {
  duration: number;
  isStoryPlaying: SharedValue<boolean>;
}

function ProgressBar({ duration, isStoryPlaying, style }: ProgressBarPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const [playedTime, setPlayedTime] = useState(0);

  const playedTimeRef = useMutableValue(playedTime);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const progressSharedValue = useSharedValue(0);

  const formattedPlayedTime = useMemo(() => formatSecondsToDuration(playedTime), [playedTime]);
  const formattedRemainedTime = useMemo(
    () => `-${formatSecondsToDuration(duration - playedTime)}`,
    [playedTime, duration],
  );

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressSharedValue.value}%`,
  }));

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      const interval = setInterval(() => {
        if (playedTimeRef.current >= duration) {
          stopTimer();
          return;
        }

        setPlayedTime(playedTimeRef.current + 1);
      }, 1000);

      timerRef.current = interval;
    }
  }, [duration, playedTimeRef, stopTimer]);

  const handleUpdatePlayPercent = useCallback(
    (playPercent: number) => {
      setPlayedTime(duration * (playPercent / 100));
    },
    [duration],
  );

  const gestureHandler = useProgressBarGestureHandler(progressSharedValue, handleUpdatePlayPercent);

  useAnimatedReaction(
    () => {
      return isStoryPlaying.value;
    },
    (isPlaying, previousIsPlaying) => {
      if (isPlaying !== previousIsPlaying) {
        if (isPlaying) {
          progressSharedValue.value = withTiming(100, {
            duration: (duration - playedTimeRef.current) * 1000,
          });

          runOnJS(startTimer)();
        } else {
          runOnJS(stopTimer)();
          progressSharedValue.value = playedTimeRef.current / duration;
        }
      }
    },
    [],
  );

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View style={[styles.progressBarContainer, style]}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressBarValue, animatedProgressStyle]} />
        </View>

        <View style={styles.timeContainer}>
          <TextView style={styles.time}>{formattedPlayedTime}</TextView>
          <TextView style={styles.time}>{formattedRemainedTime}</TextView>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

export default ProgressBar;
