import { NavigatorScreenParams } from '@react-navigation/native';

import { SharedStackParams } from '../SharedNavigator/SharedNavigator.types';

import { TabRoutes } from './TabNavigator.routes';

export interface TabStackParams extends Record<string, object | undefined> {
  [TabRoutes.FAVORITES]: NavigatorScreenParams<SharedStackParams>;
  [TabRoutes.SEARCH]: NavigatorScreenParams<SharedStackParams>;
  [TabRoutes.HOME]: NavigatorScreenParams<SharedStackParams>;
}
