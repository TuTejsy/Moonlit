import React, { useRef, useCallback, useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useMutableValue } from '@/hooks/useMutableValue';
import { MOVE_TO_PROPS } from '@/hooks/useStoryPlayer/useStoryPlayers.types';
import { formatSecondsToDuration } from '@/utils/formatters/formatSecondsToDuration';

import { useProgressBarGestureHandler } from './hooks/useProgressBarGestureHandler';
import { makeStyles } from './ProgressBar.styles';

interface ProgressBarPropTypes extends ViewProps {
  duration: number;
  isStoryPlaying: boolean;
  moveToTime: (props: MOVE_TO_PROPS) => void;
  playedTime: number;
}

export function ProgressBar({
  duration,
  isStoryPlaying,
  moveToTime,
  playedTime,
}: ProgressBarPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const [playedText, setPlayedText] = useState('');
  const [remainedTimeText, setRemainedTimeText] = useState('');

  const playedTimeRef = useMutableValue(playedTime);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const progressSharedValue = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressSharedValue.value}%`,
  }));

  const setPlayedTimeText = useCallback(
    (playPercent: number) => {
      const time = duration * (playPercent / 100);

      const formattedPlayedTime = formatSecondsToDuration(time);
      const formattedRemainedTime = `-${formatSecondsToDuration(duration - time)}`;

      setPlayedText(formattedPlayedTime);
      setRemainedTimeText(formattedRemainedTime);
    },
    [duration],
  );

  const setPlayedTimeTextForTime = useCallback(
    (time: number) => {
      const formattedPlayedTime = formatSecondsToDuration(time);
      const formattedRemainedTime = `-${formatSecondsToDuration(duration - time)}`;

      setPlayedText(formattedPlayedTime);
      setRemainedTimeText(formattedRemainedTime);
    },
    [duration],
  );

  const handleUpdatePlayPercent = useCallback(
    (playPercent: number) => {
      const timeToMove = duration * (playPercent / 100);
      moveToTime({ exactTime: timeToMove });
      playedTimeRef.current = timeToMove;
    },
    [duration, moveToTime, playedTimeRef],
  );

  const [gestureHandler, isGestureActiveRef] = useProgressBarGestureHandler(
    progressSharedValue,
    handleUpdatePlayPercent,
    setPlayedTimeText,
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      const interval = setInterval(() => {
        if (!isGestureActiveRef.current) {
          if (playedTimeRef.current >= duration) {
            stopTimer();
            return;
          }

          playedTimeRef.current += 1;
          setPlayedTimeTextForTime(playedTimeRef.current);
        }
      }, 1000);

      timerRef.current = interval;
    }
  }, [isGestureActiveRef, playedTimeRef, duration, setPlayedTimeTextForTime, stopTimer]);

  useEffect(() => {
    if (!isGestureActiveRef.current) {
      progressSharedValue.value = (playedTime / duration) * 100;

      if (isStoryPlaying) {
        progressSharedValue.value = withTiming(100, {
          duration: (duration - playedTime) * 1000,
          easing: Easing.linear,
        });

        startTimer();
      } else {
        stopTimer();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStoryPlaying, isGestureActiveRef, playedTime]);

  useEffect(() => {
    setPlayedTimeTextForTime(playedTime);
    playedTimeRef.current = playedTime;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedTime, isStoryPlaying]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressBarValue, animatedProgressStyle]}>
            <Animated.View style={styles.cirlce} />
          </Animated.View>
        </View>

        <View style={styles.timeContainer}>
          <TextView style={styles.time}>{playedText}</TextView>
          <TextView style={styles.time}>{remainedTimeText}</TextView>
        </View>
      </View>
    </GestureDetector>
  );
}
