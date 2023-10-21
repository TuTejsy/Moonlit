import { Gesture } from 'react-native-gesture-handler';
import {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useStoryCoverGestureHandler(
  storyPlayingSharedValue: SharedValue<number>,
  onCoverCollapsed: () => void,
) {
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

        if (e.translationY < -40) {
          storyPlayingSharedValue.value = withTiming(0);
          runOnJS(onCoverCollapsed)();
        } else {
          storyPlayingSharedValue.value = withTiming(1);
        }
      }
    });

  return gesture;
}
