import { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';

export const useAnimatedScrollHandlerValue = (maxHeight?: number) => {
  const scrollPositionSharedValue = useSharedValue(0);

  const handleAnimatedScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

      if (!maxHeight || contentSize.height - layoutMeasurement.height > maxHeight) {
        scrollPositionSharedValue.value = contentOffset.y;
      }
    },

    [maxHeight, scrollPositionSharedValue],
  );

  return { handleAnimatedScroll, scrollPositionSharedValue };
};
