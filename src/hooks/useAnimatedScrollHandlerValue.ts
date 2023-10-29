import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export const useAnimatedScrollHandlerValue = () => {
  const scrollPositionSharedValue = useSharedValue(0);

  const handleAnimatedScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPositionSharedValue.value = event.contentOffset.y;
    },
  });

  return { handleAnimatedScroll, scrollPositionSharedValue };
};
