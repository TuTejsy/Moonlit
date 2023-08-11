import { useCallback, useMemo } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useScrollOpacity = (activeOpacity = 1, inactiveOpacity = 0) => {
  const opacityActivity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(opacityActivity.value, [0, 1], [inactiveOpacity, activeOpacity]);

    return {
      opacity,
    };
  });

  const handleOpacityScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      opacityActivity.value = withTiming(event.nativeEvent.contentOffset.y > 0 ? 1 : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [opacityActivity],
  );

  const values = useMemo(() => {
    const opacityAnimStyle = animatedStyle;

    return { handleOpacityScroll, opacityAnimStyle };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedStyle, handleOpacityScroll]);

  return values;
};
