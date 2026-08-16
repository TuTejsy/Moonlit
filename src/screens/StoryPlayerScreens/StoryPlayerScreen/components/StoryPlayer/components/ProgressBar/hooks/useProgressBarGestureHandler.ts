import { useCallback, useRef } from 'react';

import { useCompetingGestures, usePanGesture, useTapGesture } from 'react-native-gesture-handler';
import { Extrapolation, SharedValue, interpolate } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { useLayout } from '@/hooks/theme/useLayout';

export function useProgressBarGestureHandler(
  progressSharedValue: SharedValue<number>,
  onUpdatePlayPercent: (playPercent: number) => void,
  setPlayedTimeText: (playPercent: number) => void,
) {
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

  const tapGesture = useTapGesture({
    numberOfTaps: 1,
    onDeactivate: () => {
      scheduleOnRN(setIsTapActiveRef, false);
      scheduleOnRN(onUpdatePlayPercent, progressSharedValue.get());
    },
    onFinalize: () => {
      scheduleOnRN(setIsTapActiveRef, false);
    },
    onTouchesDown: (e) => {
      scheduleOnRN(setIsTapActiveRef, true);

      progressSharedValue.set(
        interpolate(
          e.allTouches[0].absoluteX,
          [horizontalPadding, windowWidth - horizontalPadding],
          [0, 100],
          Extrapolation.CLAMP,
        ),
      );
    },
  });

  const panGesture = usePanGesture({
    onActivate: () => {
      scheduleOnRN(setIsPanActiveRef, true);
    },
    onDeactivate: () => {
      scheduleOnRN(setIsPanActiveRef, false);
      scheduleOnRN(onUpdatePlayPercent, progressSharedValue.get());
    },
    onUpdate: (e) => {
      progressSharedValue.set(
        interpolate(
          e.absoluteX,
          [horizontalPadding, windowWidth - horizontalPadding],
          [0, 100],
          Extrapolation.CLAMP,
        ),
      );

      scheduleOnRN(setPlayedTimeText, progressSharedValue.get());
    },
  });

  const composedGesture = useCompetingGestures(panGesture, tapGesture);

  return [composedGesture, isGestureActiveRef] as const;
}
