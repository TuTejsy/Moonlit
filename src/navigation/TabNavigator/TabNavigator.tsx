import React, { useCallback } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';

import { SharedNavigator } from '../SharedNavigator/SharedNavigator';

import { renderTabBar, rootTabOptions } from './TabNavigator.options';
import { TabStackParams } from './TabNavigator.types';

const Tab = createBottomTabNavigator<TabStackParams>();

interface TabNavigatorProps {
  isInitialRoute?: boolean;
}

export const TabNavigator = ({ isInitialRoute = false }: TabNavigatorProps) => {
  const Home = useCallback(
    () => <SharedNavigator isInitialRoute={isInitialRoute} parentRoute={TabRoutes.HOME} />,
    [isInitialRoute],
  );
  const AIVoice = useCallback(() => <SharedNavigator parentRoute={TabRoutes.AI_VOICE} />, []);
  const Favorites = useCallback(() => <SharedNavigator parentRoute={TabRoutes.FAVORITES} />, []);
  const Settings = useCallback(() => <SharedNavigator parentRoute={TabRoutes.SETTINGS} />, []);

  return (
    <Tab.Navigator
      backBehavior='history'
      detachInactiveScreens={false}
      screenOptions={rootTabOptions}
      tabBar={renderTabBar}
    >
      <Tab.Screen component={Home} name={TabRoutes.HOME} />
      <Tab.Screen component={AIVoice} name={TabRoutes.AI_VOICE} />
      <Tab.Screen component={Favorites} name={TabRoutes.FAVORITES} />
      <Tab.Screen component={Settings} name={TabRoutes.SETTINGS} />
    </Tab.Navigator>
  );
};
