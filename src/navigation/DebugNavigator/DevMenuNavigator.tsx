import React, { memo } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from '@/hooks/theme/useTheme';
import { DevMenuMainModal } from '@/screens/DevMenuScreens/DevMenuMainModal/DevMenuMainModal';

import { devMenuOptions } from './DevMenuNavigator.options';
import { DevMenuRoutes } from './DevMenuNavigator.routes';
import { DevMenuStackParams } from './DevMenuNavigator.types';

const DevMenuStack = createStackNavigator<DevMenuStackParams>();

export const DevMenuNavigator = memo(() => {
  const theme = useTheme();

  return (
    <DevMenuStack.Navigator
      initialRouteName={DevMenuRoutes.MAIN}
      screenOptions={devMenuOptions(theme)}
    >
      <DevMenuStack.Screen component={DevMenuMainModal} name={DevMenuRoutes.MAIN} />
    </DevMenuStack.Navigator>
  );
});
