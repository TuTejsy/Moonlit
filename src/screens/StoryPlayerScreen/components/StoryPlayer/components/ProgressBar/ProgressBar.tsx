import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { View, ViewProps } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import useMutableValue from '@/hooks/useMutableValue';
import { formatSecondsToDuration } from '@/utils/formatters/formatSecondsToDuration';

import useProgressBarGestureHandler from './hooks/useProgressBarGestureHandler';
import { makeStyles } from './ProgressBar.styles';

interface ProgressBarPropTypes extends ViewProps {
  duration: number;
  isStoryPlaying: boolean;
  moveToTime: (playedTime: number) => void;
  playedTime: number;
  setPlayedTime: (playedTime: number) => void;
}

function ProgressBar({
  duration,
  isStoryPlaying,
  moveToTime,
  playedTime,
  setPlayedTime,
}: ProgressBarPropTypes) {
  const styles = useMakeStyles(makeStyles);

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
  }, [duration, playedTimeRef, stopTimer, setPlayedTime]);

  const handleUpdatePlayPercent = useCallback(
    (playPercent: number) => {
      moveToTime(duration * (playPercent / 100));
    },
    [duration, moveToTime],
  );

  const [gestureHandler, isGestureActiveRef] = useProgressBarGestureHandler(
    progressSharedValue,
    handleUpdatePlayPercent,
  );

  useEffect(() => {
    if (!isGestureActiveRef.current) {
      progressSharedValue.value = (playedTime / duration) * 100;

      if (isStoryPlaying) {
        progressSharedValue.value = withTiming(100, {
          duration: (duration - playedTime) * 1000,
        });

        startTimer();
      } else {
        stopTimer();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStoryPlaying, isGestureActiveRef, playedTime]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressBarValue, animatedProgressStyle]} />
        </View>

        <View style={styles.timeContainer}>
          <TextView style={styles.time}>{formattedPlayedTime}</TextView>
          <TextView style={styles.time}>{formattedRemainedTime}</TextView>
        </View>
      </View>
    </GestureDetector>
  );
}

export default ProgressBar;
