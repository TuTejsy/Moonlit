import { useCallback } from 'react';

import {
  FEATURING_STORIES_FILTER,
  FREE_STORIES_FILTER,
  POPULAR_STORIES_CONFIG,
  POPULAR_STORIES_FILTER,
} from '@/constants/stories';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

export const useDefaultListNavigation = () => {
  const navigation = useAppNavigation<SharedRoutes.HOME>();

  const handleSeeFeaturingTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME), {
      storiesFilter: FEATURING_STORIES_FILTER,
      title: 'Featuring tales',
    });
  }, [navigation]);

  const handleSeeAllTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME));
  }, [navigation]);

  const handleSeePopularTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME), {
      storiesFilter: POPULAR_STORIES_FILTER,
      storiesSortConfigs: POPULAR_STORIES_CONFIG,
      title: 'Popular tales',
    });
  }, [navigation]);

  const handleSeeFreeTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME), {
      storiesFilter: FREE_STORIES_FILTER,
      title: 'Free tales',
    });
  }, [navigation]);

  return {
    handleSeeAllTales,
    handleSeeFeaturingTales,
    handleSeeFreeTales,
    handleSeePopularTales,
  };
};
