import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TabRoutes } from '../TabNavigator/TabNavigator.routes';

import { AllRoutes } from './allRoutes';
import { AllStackParams } from './allStackParams';

export type NavigationAppProp<R extends AllRoutes | unknown> = R extends AllRoutes
  ? R extends TabRoutes
    ? BottomTabNavigationProp<AllStackParams, R>
    : StackNavigationProp<AllStackParams, R>
  : NavigationProp<AllStackParams>;

export type RouteAppProp<R extends AllRoutes> = RouteProp<AllStackParams, R>;

export type RouteAppParams<R extends AllRoutes> = RouteAppProp<R>['params'];
