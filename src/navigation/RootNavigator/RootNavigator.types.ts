import { NavigatorScreenParams } from '@react-navigation/native';
import { AdaptyPaywallProduct } from 'react-native-adapty';

import { TabStackParams } from '../TabNavigator/TabNavigator.types';

import { RootRoutes } from './RootNavigator.routes';

export interface RootStackParams extends Record<string, object | undefined> {
  [RootRoutes.TAB]: NavigatorScreenParams<TabStackParams>;

  [RootRoutes.STORY_PLAYER]: {
    storyId: number;
  };

  [RootRoutes.PAYWALL_MODAL]: {
    product: AdaptyPaywallProduct;
  };

  [RootRoutes.VOICE_SETTINGS_MODAL]: {
    onSelectAudioRecording: (selectedAudioRecordingId: number) => void;
    selectedAudioRecordingId: number;
    storyColor: string;
    storyId: number;
  };
}
