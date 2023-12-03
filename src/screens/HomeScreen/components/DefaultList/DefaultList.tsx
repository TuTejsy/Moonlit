import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Results } from 'realm';

import { LargeStoriesList } from '@/components/Lists/LargeStoriesList/LargeStoriesList';
import { MediumStoriesList } from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { PromotionBanner } from '@/components/PromotionBanner/PromotionBanner';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import {
  FEATURING_STORIES_FILTER,
  FREE_STORIES_FILTER,
  POPULAR_STORIES_CONFIG,
} from '@/constants/stories';
import { StorySchema } from '@/database/schema/stories/types';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { CategoriesList } from '@/screens/HomeScreen/components/CategoriesList/CategoriesList';
import { SectionHeader } from '@/screens/HomeScreen/components/SectionHeader/SectionHeader';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { useStoriesUpdate } from '../../hooks/useStoriesUpdate';

import { makeStyles } from './DefaultList.styles';

interface DefaultListPropTypes {
  allStories: Results<StorySchema>;
  allStoriesVersion: number;
  isListVisible: boolean;
  popularStories: Results<StorySchema>;
  popularStoriesVersion: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const DefaultList = React.memo(
  ({
    allStories,
    allStoriesVersion,
    isListVisible,
    onScroll,
    popularStories,
    popularStoriesVersion,
  }: DefaultListPropTypes) => {
    const isFullVersion = useAppSelector(selectIsFullVersion);

    const stylesContext = useMemo(() => ({ isFullVersion }), [isFullVersion]);

    const styles = useMakeStyles(makeStyles, stylesContext);
    const { colors } = useTheme();

    const insets = useSafeAreaInsets();
    const navigation = useAppNavigation<SharedRoutes.HOME>();

    const [isRefreshing, updateStories] = useStoriesUpdate();
    const currentScrollRef = useRef(0);

    const [featuringStories, featuringStoriesVersion] = useStories(FEATURING_STORIES_FILTER);
    const [freeStories, freeStoriesVersion] = useStories(FREE_STORIES_FILTER);

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
    const handleScrollToTop = useCallback(() => {
      onScroll?.({
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    }, [onScroll]);

    const handleScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
      currentScrollRef.current = event.nativeEvent.contentOffset.y;
    }, []);

    const handleCurrentScroll = useCallback(() => {
      onScroll?.({
        nativeEvent: {
          contentOffset: { x: 0, y: currentScrollRef.current },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    }, [onScroll]);

    useEffect(() => {
      if (isListVisible) {
        handleCurrentScroll();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListVisible]);

    return (
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={styles.content}
        indicatorStyle='white'
        keyboardDismissMode='on-drag'
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ top: DEFAULT_HEADER_HEIGHT + insets.top }}
        refreshControl={
          <RefreshControl
            progressViewOffset={insets.top + DEFAULT_HEADER_HEIGHT}
            refreshing={isRefreshing}
            tintColor={colors.white}
            onRefresh={updateStories}
          />
        }
        onScroll={onScroll}
        onScrollEndDrag={handleScrollEndDrag}
        onScrollToTop={handleScrollToTop}
      >
        <SectionHeader title='Featuring tales' onSeeAllPress={handleSeeFeaturingTales} />

        <LargeStoriesList stories={featuringStories} storiesVersion={featuringStoriesVersion} />

        <CategoriesList />

        <SectionHeader title='Popular tales' onSeeAllPress={handleSeePopularTales} />
        <MediumStoriesList
          stories={popularStories}
          storiesVersion={popularStoriesVersion}
          style={styles.popularList}
        />

        {!isFullVersion && (
          <>
            <PromotionBanner style={styles.promotionBanner} />

            <SectionHeader title='Free tales' onSeeAllPress={handleSeeFreeTales} />
            <MediumStoriesList
              stories={freeStories}
              storiesVersion={freeStoriesVersion}
              style={styles.freeList}
            />
          </>
        )}
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
