import { Gesture } from 'react-native-gesture-handler';
import {
  Extrapolate,
  SharedValue,
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function useStoryCoverGestureHandler(storyPlayingSharedValue: SharedValue<number>) {
  const isGestureEnabled = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      if (storyPlayingSharedValue.value === 1) {
        isGestureEnabled.value = true;
      }
    })
    .onUpdate((e) => {
      if (isGestureEnabled.value) {
        storyPlayingSharedValue.value = interpolate(
          e.translationY,
          [-10, -110],
          [1, 0],
          Extrapolate.CLAMP,
        );
      }
    })
    .onEnd((e) => {
      if (isGestureEnabled.value) {
        isGestureEnabled.value = false;

        storyPlayingSharedValue.value = withTiming(e.translationY < -40 ? 0 : 1);
      }
    });

  return gesture;
}

export default useStoryCoverGestureHandler;
