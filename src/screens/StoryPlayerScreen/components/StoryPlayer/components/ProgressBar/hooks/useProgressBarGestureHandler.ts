import { useCallback, useRef } from 'react';

import { ComposedGesture, Gesture } from 'react-native-gesture-handler';
import { Extrapolation, SharedValue, interpolate, runOnJS } from 'react-native-reanimated';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';

export function useProgressBarGestureHandler(
  progressSharedValue: SharedValue<number>,
  onUpdatePlayPercent: (playPercent: number) => void,
  setPlayedTimeText: (playPercent: number) => void,
): [ComposedGesture, React.MutableRefObject<boolean>] {
  const isTapActiveRef = useRef(false);
  const isPanActiveRef = useRef(false);
  const isGestureActiveRef = useRef(false);

  const setIsPanActiveRef = useCallback((value: boolean) => {
    isPanActiveRef.current = value;

    if (value) {
      isGestureActiveRef.current = true;
    } else if (!isTapActiveRef.current) {
      isGestureActiveRef.current = false;
    }
  }, []);

  const setIsTapActiveRef = useCallback((value: boolean) => {
    isTapActiveRef.current = value;

    if (value) {
      isGestureActiveRef.current = true;
    } else if (!isPanActiveRef.current) {
      isGestureActiveRef.current = false;
    }
  }, []);

  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onTouchesDown((e) => {
      runOnJS(setIsTapActiveRef)(true);

      progressSharedValue.value = interpolate(
        e.allTouches[0].absoluteX,
        [HORIZONTAL_PADDING, SCREEN_WIDTH - HORIZONTAL_PADDING],
        [0, 100],
        Extrapolation.CLAMP,
      );
    })
    .onFinalize(() => {
      runOnJS(setIsTapActiveRef)(false);
    })
    .onEnd(() => {
      runOnJS(setIsTapActiveRef)(false);
      runOnJS(onUpdatePlayPercent)(progressSharedValue.value);
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(setIsPanActiveRef)(true);
    })
    .onUpdate((e) => {
      progressSharedValue.value = interpolate(
        e.absoluteX,
        [HORIZONTAL_PADDING, SCREEN_WIDTH - HORIZONTAL_PADDING],
        [0, 100],
        Extrapolation.CLAMP,
      );

      runOnJS(setPlayedTimeText)(progressSharedValue.value);
    })
    .onEnd(() => {
      runOnJS(setIsPanActiveRef)(false);

      runOnJS(onUpdatePlayPercent)(progressSharedValue.value);
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  return [composedGesture, isGestureActiveRef];
}
