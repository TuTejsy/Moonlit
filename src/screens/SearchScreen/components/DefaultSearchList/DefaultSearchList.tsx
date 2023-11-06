import React, { useCallback, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Results } from 'realm';

import { MediumStoriesList } from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { PromotionBanner } from '@/components/PromotionBanner/PromotionBanner';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { FREE_STORIES_FILTER, POPULAR_STORIES_CONFIG } from '@/constants/stories';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { CategoriesList } from '@/screens/HomeScreen/components/CategoriesList/CategoriesList';
import { SectionHeader } from '@/screens/HomeScreen/components/SectionHeader/SectionHeader';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { makeStyles } from './DefaultSearchList.styles';

interface DefaultSearchListPropTypes {
  allStories: Results<StorySchema>;
  allStoriesVersion: number;
  freeStories: Results<StorySchema>;
  freeStoriesVersion: number;
  popularStories: Results<StorySchema>;
  popularStoriesVersion: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const DefaultSearchList = React.memo(
  ({
    allStories,
    allStoriesVersion,
    freeStories,
    freeStoriesVersion,
    onScroll,
    popularStories,
    popularStoriesVersion,
  }: DefaultSearchListPropTypes) => {
    const styles = useMakeStyles(makeStyles);

    const insets = useSafeAreaInsets();

    const navigation = useAppNavigation<SharedRoutes.SEARCH>();

    const handleSeeAllTales = useCallback(() => {
      navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.SEARCH));
    }, [navigation]);

    const handleSeePopularTales = useCallback(() => {
      navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.SEARCH), {
        storiesSortConfig: POPULAR_STORIES_CONFIG,
        title: 'Popular tales',
      });
    }, [navigation]);

    const handleSeeFreeTales = useCallback(() => {
      navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, TabRoutes.SEARCH), {
        storiesFilter: FREE_STORIES_FILTER,
        title: 'Free tales',
      });
    }, [navigation]);

    const handleScrollToTop = useCallback(() => {
      onScroll?.({
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    }, [onScroll]);

    useEffect(() => {
      handleScrollToTop();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={styles.content}
        indicatorStyle='white'
        keyboardDismissMode='on-drag'
        scrollIndicatorInsets={{ top: DEFAULT_HEADER_HEIGHT + insets.top }}
        onScroll={onScroll}
        onScrollToTop={handleScrollToTop}
      >
        <SectionHeader title='Popular tales' onSeeAllPress={handleSeePopularTales} />
        <MediumStoriesList
          stories={popularStories}
          storiesVersion={popularStoriesVersion}
          style={styles.popularList}
        />

        <CategoriesList />

        <PromotionBanner style={styles.promotionBanner} />

        <SectionHeader title='Free tales' onSeeAllPress={handleSeeFreeTales} />
        <MediumStoriesList
          stories={freeStories}
          storiesVersion={freeStoriesVersion}
          style={styles.freeList}
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
    );
  },
);
