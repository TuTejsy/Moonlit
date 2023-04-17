import React from 'react';

import { SharedValue } from 'react-native-reanimated';

interface StoryPlayerPropTypes {
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryPlayer({ storyPlayingSharedValue }: StoryPlayerPropTypes) {}

export default StoryPlayer;
