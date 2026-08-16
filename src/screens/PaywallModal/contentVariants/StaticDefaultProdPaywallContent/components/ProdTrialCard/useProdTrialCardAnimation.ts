import { useCallback, useEffect } from 'react';

import {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DURATION_MS = 240;
const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

interface UseProdTrialCardAnimationColors {
  borderOff: string;
  borderOn: string;
  indicatorBgOff: string;
  indicatorBgOn: string;
  surfaceOff: string;
  surfaceOn: string;
}

export function useProdTrialCardAnimation(
  enabled: boolean,
  colors: UseProdTrialCardAnimationColors,
) {
  const { borderOff, borderOn, indicatorBgOff, indicatorBgOn, surfaceOff, surfaceOn } = colors;
  const progress = useSharedValue(enabled ? 1 : 0);
  const stripContentHeight = useSharedValue(0);

  useEffect(() => {
    const [x1, y1, x2, y2] = EASE_IN_OUT;
    progress.set(
      withTiming(enabled ? 1 : 0, {
        duration: DURATION_MS,
        easing: Easing.bezier(x1, y1, x2, y2),
        reduceMotion: ReduceMotion.System,
      }),
    );
  }, [enabled, progress]);

  const setStripContentHeight = useCallback(
    (height: number) => {
      stripContentHeight.set(height);
    },
    [stripContentHeight],
  );

  const surfaceStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [surfaceOff, surfaceOn]),
    borderColor: interpolateColor(progress.get(), [0, 1], [borderOff, borderOn]),
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [indicatorBgOff, indicatorBgOn]),
    borderColor: interpolateColor(progress.get(), [0, 1], [borderOff, borderOn]),
  }));

  const stripStyle = useAnimatedStyle(() => ({
    height: stripContentHeight.get() * progress.get(),
    opacity: progress.get(),
  }));

  return { indicatorStyle, setStripContentHeight, stripStyle, surfaceStyle };
}
