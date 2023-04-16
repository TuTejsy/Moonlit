import { Gesture } from 'react-native-gesture-handler';
import { SharedValue, interpolate, useSharedValue, withTiming } from 'react-native-reanimated';

import { EXTROPOLATION_CONFIG } from '../StoryPlayerScreen.constants';

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
          EXTROPOLATION_CONFIG,
        );
      }
    })
    .onEnd(() => {
      if (isGestureEnabled.value) {
        isGestureEnabled.value = false;
        storyPlayingSharedValue.value = withTiming(0);
      }
    });

  return gesture;
}

export default useStoryCoverGestureHandler;
