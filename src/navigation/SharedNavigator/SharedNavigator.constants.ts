import { TabRoutes } from '../TabNavigator/TabNavigator.routes';

import { SharedRoutes } from './SharedNavigator.routes';

export const INITIAL_ROUTE_MAP = {
  [TabRoutes.HOME]: SharedRoutes.HOME,
  [TabRoutes.FAVORITES]: SharedRoutes.FAVORITES,
  [TabRoutes.SETTINGS]: SharedRoutes.SETTINGS,
};
