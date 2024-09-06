import { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';

interface UseAnimatedScrollHandlerValueProps {
  horizontal?: boolean;
  maxOffset?: number;
}

export const useAnimatedScrollHandlerValue = ({
  horizontal = false,
  maxOffset,
}: UseAnimatedScrollHandlerValueProps = {}) => {
  const scrollPositionSharedValue = useSharedValue(0);

  const handleAnimatedScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

      if (horizontal) {
        if (!maxOffset || contentSize.width - layoutMeasurement.width > maxOffset) {
          scrollPositionSharedValue.value = contentOffset.x;
        }
      } else if (!maxOffset || contentSize.height - layoutMeasurement.height > maxOffset) {
        scrollPositionSharedValue.value = contentOffset.y;
      }
    },

    [horizontal, maxOffset, scrollPositionSharedValue],
  );

  return { handleAnimatedScroll, scrollPositionSharedValue };
};
