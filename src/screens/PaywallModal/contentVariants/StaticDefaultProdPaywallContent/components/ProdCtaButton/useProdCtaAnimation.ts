import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

import {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BLEED_PAUSE_MS = 3000;
const BLEED_SWEEP_MS = 2000;
const BLEED_WIDTH_RATIO = 0.19;
const BLEED_ROTATE = '-30deg';

const SHAKE_PAUSE_MS = 200;
const SHAKE_MS = 2000;
const SHAKE_AMP = 2;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface UseProdCtaAnimationParams {
  containerWidth: number;
  disabled: boolean;
}

export function useProdCtaAnimation({ containerWidth, disabled }: UseProdCtaAnimationParams) {
  const [reduceMotion, setReduceMotion] = useState(false);

  const bleedProgress = useSharedValue(0);
  const chevronShakeProgress = useSharedValue(0);
  const layoutWidth = useSharedValue(0);

  const shouldAnimate = !disabled && !reduceMotion && containerWidth > 0;

  useEffect(() => {
    layoutWidth.set(containerWidth);
  }, [containerWidth, layoutWidth]);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) {
          setReduceMotion(enabled);
        }
      })
      .catch(() => undefined);

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setReduceMotion(enabled);
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimate) {
      cancelAnimation(bleedProgress);
      cancelAnimation(chevronShakeProgress);
      bleedProgress.set(0);
      chevronShakeProgress.set(0);
      return;
    }

    const [x1, y1, x2, y2] = EASE_OUT;
    const easing = Easing.bezier(x1, y1, x2, y2);

    bleedProgress.set(0);
    bleedProgress.set(
      withRepeat(
        withSequence(
          withDelay(BLEED_PAUSE_MS, withTiming(1, { duration: BLEED_SWEEP_MS, easing })),
          withTiming(0, { duration: 0 }),
        ),
        -1,
        false,
      ),
    );

    chevronShakeProgress.set(0);
    chevronShakeProgress.set(
      withRepeat(
        withSequence(
          withDelay(SHAKE_PAUSE_MS, withTiming(1, { duration: SHAKE_MS, easing })),
          withTiming(0, { duration: 0 }),
        ),
        -1,
        false,
      ),
    );

    return () => {
      cancelAnimation(bleedProgress);
      cancelAnimation(chevronShakeProgress);
    };
  }, [bleedProgress, chevronShakeProgress, shouldAnimate]);

  const bleedStyle = useAnimatedStyle(() => {
    const width = layoutWidth.get();
    const bleedWidth = width * BLEED_WIDTH_RATIO;
    const translateX = interpolate(bleedProgress.get(), [0, 1], [-bleedWidth, width + bleedWidth]);

    return {
      height: bleedWidth * 2,
      transform: [{ translateX }, { rotate: BLEED_ROTATE }, { translateY: -bleedWidth }],
      width: bleedWidth,
    };
  });

  const chevronShakeStyle = useAnimatedStyle(() => {
    const amp = SHAKE_AMP;
    const translateX = interpolate(
      chevronShakeProgress.get(),
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, amp * 0.75, -amp * 0.75, amp * 0.5, -amp * 0.5, 0],
    );

    return {
      transform: [{ translateX }],
    };
  });

  return { bleedStyle, chevronShakeStyle, shouldAnimate };
}
