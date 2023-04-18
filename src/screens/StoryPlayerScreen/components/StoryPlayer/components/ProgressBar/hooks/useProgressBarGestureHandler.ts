import { Gesture } from 'react-native-gesture-handler';
import { SharedValue, interpolate, runOnJS, useSharedValue } from 'react-native-reanimated';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { EXTROPOLATION_CONFIG } from '@/screens/StoryPlayerScreen/StoryPlayerScreen.constants';

function useProgressBarGestureHandler(
  progressSharedValue: SharedValue<number>,
  onUpdatePlayPercent: (playPercent: number) => void,
) {
  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onTouchesDown((e) => {
      progressSharedValue.value = interpolate(
        e.allTouches[0].absoluteX,
        [HORIZONTAL_PADDING, SCREEN_WIDTH - HORIZONTAL_PADDING],
        [0, 100],
        EXTROPOLATION_CONFIG,
      );
    })
    .onEnd(() => {
      runOnJS(onUpdatePlayPercent)(progressSharedValue.value);
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      progressSharedValue.value = interpolate(
        e.absoluteX,
        [HORIZONTAL_PADDING, SCREEN_WIDTH - HORIZONTAL_PADDING],
        [0, 100],
        EXTROPOLATION_CONFIG,
      );
    })
    .onEnd(() => {
      runOnJS(onUpdatePlayPercent)(progressSharedValue.value);
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  return composedGesture;
}

export default useProgressBarGestureHandler;
