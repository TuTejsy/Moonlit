import { NavigatorScreenParams } from '@react-navigation/native';
import { SubscriptionIOS } from 'react-native-iap';

import { TabStackParams } from '../TabNavigator/TabNavigator.types';

import { RootRoutes } from './RootNavigator.routes';

export interface RootStackParams extends Record<string, object | undefined> {
  [RootRoutes.TAB]: NavigatorScreenParams<TabStackParams>;

  [RootRoutes.STORY_PLAYER]: {
    storyId: number;
  };

  [RootRoutes.PAYWALL_MODAL]: {
    subscription: SubscriptionIOS;
  };
}
