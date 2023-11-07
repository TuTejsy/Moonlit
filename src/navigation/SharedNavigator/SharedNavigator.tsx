import { memo, useMemo } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from '@/hooks/theme/useTheme';
import { FavoritesScreen } from '@/screens/FavoritesScreen/FavoritesScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';
import { SearchScreen } from '@/screens/SearchScreen/SearchScreen';
import { StoriesListScreen } from '@/screens/StoriesListScreen/StoriesListScreen';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { TabRoutes } from '../TabNavigator/TabNavigator.routes';

import { INITIAL_ROUTE_MAP } from './SharedNavigator.constants';
import { commonOptions } from './SharedNavigator.options';
import { SharedRoutes } from './SharedNavigator.routes';
import type { SharedStackParams } from './SharedNavigator.types';

const Stack = createStackNavigator<SharedStackParams>();

interface Props {
  parentRoute: TabRoutes;
}

export const SharedNavigator = memo(({ parentRoute }: Props) => {
  const theme = useTheme();

  const initialRouteName = useMemo(() => INITIAL_ROUTE_MAP[parentRoute], [parentRoute]);

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={commonOptions(theme)}>
      {parentRoute === TabRoutes.HOME && (
        <>
          <Stack.Screen component={HomeScreen} name={SharedRoutes.HOME} />
          <Stack.Screen
            component={StoriesListScreen}
            name={getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME)}
          />
        </>
      )}

      {parentRoute === TabRoutes.SEARCH && (
        <>
          <Stack.Screen component={SearchScreen} name={SharedRoutes.SEARCH} />
          <Stack.Screen
            component={StoriesListScreen}
            name={getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.SEARCH)}
          />
        </>
      )}

      {parentRoute === TabRoutes.FAVORITES && (
        <Stack.Screen component={FavoritesScreen} name={SharedRoutes.FAVORITES} />
      )}
    </Stack.Navigator>
  );
});
