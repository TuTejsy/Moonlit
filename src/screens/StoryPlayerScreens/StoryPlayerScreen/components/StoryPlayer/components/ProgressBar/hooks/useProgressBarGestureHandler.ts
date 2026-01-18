import { useCallback, useRef } from 'react';

import { ComposedGesture, Gesture } from 'react-native-gesture-handler';
import { Extrapolation, SharedValue, interpolate } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { useLayout } from '@/hooks/theme/useLayout';

export function useProgressBarGestureHandler(
  progressSharedValue: SharedValue<number>,
  onUpdatePlayPercent: (playPercent: number) => void,
  setPlayedTimeText: (playPercent: number) => void,
): [ComposedGesture, React.MutableRefObject<boolean>] {
  const isTapActiveRef = useRef(false);
  const isPanActiveRef = useRef(false);
  const isGestureActiveRef = useRef(false);

  const { horizontalPadding, windowWidth } = useLayout();

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
      scheduleOnRN(setIsTapActiveRef, true);

      progressSharedValue.value = interpolate(
        e.allTouches[0].absoluteX,
        [horizontalPadding, windowWidth - horizontalPadding],
        [0, 100],
        Extrapolation.CLAMP,
      );
    })
    .onFinalize(() => {
      scheduleOnRN(setIsTapActiveRef, false);
    })
    .onEnd(() => {
      scheduleOnRN(setIsTapActiveRef, false);
      scheduleOnRN(onUpdatePlayPercent, progressSharedValue.value);
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scheduleOnRN(setIsPanActiveRef, true);
    })
    .onUpdate((e) => {
      progressSharedValue.value = interpolate(
        e.absoluteX,
        [horizontalPadding, windowWidth - horizontalPadding],
        [0, 100],
        Extrapolation.CLAMP,
      );

      scheduleOnRN(setPlayedTimeText, progressSharedValue.value);
    })
    .onEnd(() => {
      scheduleOnRN(setIsPanActiveRef, false);

      scheduleOnRN(onUpdatePlayPercent, progressSharedValue.value);
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  return [composedGesture, isGestureActiveRef];
}
