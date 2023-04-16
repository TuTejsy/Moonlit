import { memo, useMemo } from 'react';

import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';

import { useTheme } from '@/hooks/theme/useTheme';

import { TabRoutes } from '../TabNavigator/TabNavigator.routes';

import { INITIAL_ROUTE_MAP } from './SharedNavigator.constants';
import { commonOptions } from './SharedNavigator.options';
import { SharedRoutes } from './SharedNavigator.routes';
import type { SharedStackParams } from './SharedNavigator.types';

const Stack = createStackNavigator<SharedStackParams>();

interface Props {
  parentRoute: TabRoutes;
}

const forFade: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

// export const SharedNavigator = memo(({ parentRoute }: Props) => {
//   const theme = useTheme();

//   // const initialRouteName = useMemo(() => INITIAL_ROUTE_MAP[parentRoute], [parentRoute]);

//   return (
//     // <Stack.Navigator initialRouteName={initialRouteName} screenOptions={commonOptions(theme)} />\
//   );
// });
