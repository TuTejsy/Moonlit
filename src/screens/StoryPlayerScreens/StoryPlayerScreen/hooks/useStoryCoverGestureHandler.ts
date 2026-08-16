import { usePanGesture } from 'react-native-gesture-handler';
import {
  Extrapolation,
  SharedValue,
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export function useStoryCoverGestureHandler(
  storyPlayingSharedValue: SharedValue<number>,
  onCoverCollapsed: () => void,
) {
  const isGestureEnabled = useSharedValue(false);

  return usePanGesture({
    onActivate: () => {
      if (storyPlayingSharedValue.get() === 1) {
        isGestureEnabled.set(true);
      }
    },
    onDeactivate: (e) => {
      if (isGestureEnabled.get()) {
        isGestureEnabled.set(false);

        if (e.translationY < -40) {
          storyPlayingSharedValue.set(withTiming(0));
          scheduleOnRN(onCoverCollapsed);
        } else {
          storyPlayingSharedValue.set(withTiming(1));
        }
      }
    },
    onUpdate: (e) => {
      if (isGestureEnabled.get()) {
        storyPlayingSharedValue.set(
          interpolate(e.translationY, [-10, -110], [1, 0], Extrapolation.CLAMP),
        );
      }
    },
  });
}

export type StoryCoverGesture = ReturnType<typeof useStoryCoverGestureHandler>;
