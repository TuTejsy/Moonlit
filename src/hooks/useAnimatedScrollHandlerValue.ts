import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { LARGE_TITLE_HEIGHT } from '@/components/Headers/ScreenHeader/ScreenHeader.constants';

export const useAnimatedScrollHandlerValue = () => {
  const scrollPositionSharedValue = useSharedValue(0);

  const handleAnimatedScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const { contentOffset, contentSize, layoutMeasurement } = event;

      if (contentSize.height - layoutMeasurement.height > LARGE_TITLE_HEIGHT) {
        scrollPositionSharedValue.value = contentOffset.y;
      }
    },
  });

  return { handleAnimatedScroll, scrollPositionSharedValue };
};
