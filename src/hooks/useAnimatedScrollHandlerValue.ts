import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export const useAnimatedScrollHandlerValue = (maxHeight?: number) => {
  const scrollPositionSharedValue = useSharedValue(0);

  const handleAnimatedScroll = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event;

        if (!maxHeight || contentSize.height - layoutMeasurement.height > maxHeight) {
          scrollPositionSharedValue.value = contentOffset.y;
        }
      },
    },
    [maxHeight],
  );

  return { handleAnimatedScroll, scrollPositionSharedValue };
};
