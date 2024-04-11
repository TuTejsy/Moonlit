import { NavigatorScreenParams } from '@react-navigation/native';
import { AdaptyPaywallProduct } from 'react-native-adapty';

import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';

import { TabStackParams } from '../TabNavigator/TabNavigator.types';

import { RootRoutes } from './RootNavigator.routes';

export interface RootStackParams extends Record<string, object | undefined> {
  [RootRoutes.TAB]: NavigatorScreenParams<TabStackParams>;

  [RootRoutes.STORY_PLAYER]: {
    storyId: number;
    tab: TabEventType;
  };

  [RootRoutes.PAYWALL_MODAL]: {
    products: AdaptyPaywallProduct[];
    source: SOURCE;
    contentName?: string;
    onClose?: () => void;
    tab?: TabEventType;
  };

  [RootRoutes.PAYWALL_SCREEN]: {
    products: AdaptyPaywallProduct[];
    source: SOURCE;
    contentName?: string;
    onClose?: () => void;
    tab?: TabEventType;
  };

  [RootRoutes.VOICE_SETTINGS_MODAL]: {
    onSelectAudioRecording: (selectedAudioRecordingId: number) => void;
    selectedAudioRecordingId: number;
    storyColor: string;
    storyId: number;
  };
}
