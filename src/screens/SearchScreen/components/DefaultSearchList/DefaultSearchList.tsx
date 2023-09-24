import React, { useCallback, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

import { noop } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Results } from 'realm';

import MediumStoriesList from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { PromotionBanner } from '@/components/PromotionBanner/PromotionBanner';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import CategoriesList from '@/screens/HomeScreen/components/CategoriesList/CategoriesList';
import SectionHeader from '@/screens/HomeScreen/components/SectionHeader/SectionHeader';

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

function DefaultSearchList({
  allStories,
  allStoriesVersion,
  freeStories,
  freeStoriesVersion,
  onScroll,
  popularStories,
  popularStoriesVersion,
}: DefaultSearchListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const insets = useSafeAreaInsets();

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
      <SectionHeader title='Popular tales' onSeeAllPress={noop} />
      <MediumStoriesList
        stories={popularStories}
        storiesVersion={popularStoriesVersion}
        style={styles.popularList}
      />

      <CategoriesList />

      <PromotionBanner style={styles.promotionBanner} />

      <SectionHeader title='Free tales' onSeeAllPress={noop} />
      <MediumStoriesList
        stories={freeStories}
        storiesVersion={freeStoriesVersion}
        style={styles.freeList}
      />

      <SectionHeader title='All tales' onSeeAllPress={noop} />
      <SmallStoriesList
        displayCount={6}
        isScrollable={false}
        stories={allStories}
        storiesVersion={allStoriesVersion}
        style={styles.smallList}
      />
    </ScrollView>
  );
}

export default DefaultSearchList;
