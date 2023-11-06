import React, { useCallback, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { LargeStoriesList } from '@/components/Lists/LargeStoriesList/LargeStoriesList';
import { MediumStoriesList } from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { PromotionBanner } from '@/components/PromotionBanner/PromotionBanner';
import {
  FEATURING_STORIES_FILTER,
  FREE_STORIES_FILTER,
  POPULAR_STORIES_CONFIG,
} from '@/constants/stories';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { CategoriesList } from './components/CategoriesList/CategoriesList';
import { SectionHeader } from './components/SectionHeader/SectionHeader';
import { makeStyles } from './HomeScreen.styles';
import { useStoriesUpdate } from './hooks/useStoriesUpdate';

export const HomeScreen = () => {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<SharedRoutes.HOME>();

  const [isRefreshing, updateStories] = useStoriesUpdate();

  const [allStories, allStoriesVersion] = useStories();

  const [featuringStories, featuringStoriesVersion] = useStories(FEATURING_STORIES_FILTER);

  const [popularStories, popularStoriesVersion] = useStories(undefined, POPULAR_STORIES_CONFIG);
  const [freeStories, freeStoriesVersion] = useStories(FREE_STORIES_FILTER);

  const handleSeeAllTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME));
  }, [navigation]);

  const handleSeeFeaturingTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME), {
      storiesFilter: FEATURING_STORIES_FILTER,
      title: 'Featuring tales',
    });
  }, [navigation]);

  const handleSeePopularTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME), {
      storiesSortConfig: POPULAR_STORIES_CONFIG,
      title: 'Popular tales',
    });
  }, [navigation]);

  const handleSeeFreeTales = useCallback(() => {
    navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.HOME), {
      storiesFilter: FREE_STORIES_FILTER,
      title: 'Free tales',
    });
  }, [navigation]);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0.5, 0.5]}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            tintColor={colors.white}
            onRefresh={updateStories}
          />
        }
      >
        <LinearGradient
          angle={180}
          colors={[colors.purple, colors.darkPurple]}
          locations={[0.2, 0.8]}
          style={styles.gradient}
        >
          <SectionHeader title='Featuring tales' onSeeAllPress={handleSeeFeaturingTales} />

          <LargeStoriesList stories={featuringStories} storiesVersion={featuringStoriesVersion} />
          <CategoriesList />

          <SectionHeader title='Popular tales' onSeeAllPress={handleSeePopularTales} />
          <MediumStoriesList
            stories={popularStories}
            storiesVersion={popularStoriesVersion}
            style={styles.mediumList}
          />
        </LinearGradient>

        <PromotionBanner style={styles.promotionBanner} />

        <SectionHeader title='Free tales' onSeeAllPress={handleSeeFreeTales} />
        <MediumStoriesList
          stories={freeStories}
          storiesVersion={freeStoriesVersion}
          style={styles.mediumList}
        />

        <SectionHeader title='All tales' onSeeAllPress={handleSeeAllTales} />
        <SmallStoriesList
          displayCount={6}
          isScrollable={false}
          stories={allStories}
          storiesVersion={allStoriesVersion}
          style={styles.smallList}
        />
      </ScrollView>
    </LinearGradient>
  );
};
