import React, { useCallback } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';

import { SharedNavigator } from '../SharedNavigator/SharedNavigator';

import { renderTabBar, rootTabOptions } from './TabNavigator.options';
import { TabStackParams } from './TabNavigator.types';

const Tab = createBottomTabNavigator<TabStackParams>();

export const TabNavigator = () => {
  const Main = useCallback(() => <SharedNavigator parentRoute={TabRoutes.HOME} />, []);
  const Search = useCallback(() => <SharedNavigator parentRoute={TabRoutes.SEARCH} />, []);
  const Favorites = useCallback(() => <SharedNavigator parentRoute={TabRoutes.FAVORITES} />, []);

  return (
    <Tab.Navigator backBehavior='history' screenOptions={rootTabOptions} tabBar={renderTabBar}>
      <Tab.Screen component={Main} name={TabRoutes.HOME} />
      <Tab.Screen component={Search} name={TabRoutes.SEARCH} />
      <Tab.Screen component={Favorites} name={TabRoutes.FAVORITES} />
    </Tab.Navigator>
  );
};
