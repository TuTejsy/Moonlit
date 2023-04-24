import { NavigatorScreenParams } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native/types';

import { TabStackParams } from '../TabNavigator/TabNavigator.types';

import { RootRoutes } from './RootNavigator.routes';

export interface RootStackParams extends Record<string, object | undefined> {
  [RootRoutes.TAB]: NavigatorScreenParams<TabStackParams>;

  [RootRoutes.STORY_PLAYER]: {
    storyImageSource: ImageSourcePropType;
    storyTitle: string;
  };
}
