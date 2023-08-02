import { useCallback, useMemo } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import {
  interpolate,
  processColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useScrollBackgroundColor = (activeOpacity: number, inactiveOpacity: number) => {
  const calorActivity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(calorActivity.value, [0, 1], [inactiveOpacity, activeOpacity]);

    return {
      backgroundColor: processColor(`rgba(236, 119, 72, ${opacity})`),
    };
  });

  const handleBackgroundColorScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      calorActivity.value = withTiming(event.nativeEvent.contentOffset.y > 0 ? 1 : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [calorActivity],
  );

  const values = useMemo(() => {
    const colorAnimStyle = animatedStyle;

    return { colorAnimStyle, handleBackgroundColorScroll };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedStyle, handleBackgroundColorScroll]);

  return values;
};
