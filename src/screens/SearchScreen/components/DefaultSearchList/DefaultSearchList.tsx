import React from 'react';
import { ScrollView, Image } from 'react-native';

import { noop } from 'lodash';
import { Results } from 'realm';

import PromotionBannerImage from '@/assets/images/PromotionBanner/PromotionBanner.png';
import MediumStoriesList from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { StorySchema } from '@/database/schema/stories/StorySchema.types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import CategoriesList from '@/screens/HomeScreen/components/CategoriesList/CategoriesList';
import SectionHeader from '@/screens/HomeScreen/components/SectionHeader/SectionHeader';

import { makeStyles } from './DefaultSearchList.styles';

interface DefaultSearchListPropTypes {
  allStories: Results<StorySchema>;
  freeStories: Results<StorySchema>;
  popularStories: Results<StorySchema>;
}

function DefaultSearchList({
  allStories,
  freeStories,
  popularStories,
}: DefaultSearchListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  return (
    <ScrollView
      showsVerticalScrollIndicator
      contentContainerStyle={styles.content}
      indicatorStyle='white'
      keyboardDismissMode='on-drag'
    >
      <SectionHeader title='Popular tales' onSeeAllPress={noop} />
      <MediumStoriesList stories={popularStories} style={styles.popularList} />

      <CategoriesList />

      <Image resizeMode='cover' source={PromotionBannerImage} style={styles.promotionBanner} />

      <SectionHeader title='Free tales' onSeeAllPress={noop} />
      <MediumStoriesList stories={freeStories} style={styles.freeList} />

      <SectionHeader title='All tales' onSeeAllPress={noop} />
      <SmallStoriesList
        displayCount={6}
        isScrollable={false}
        stories={allStories}
        style={styles.smallList}
      />
    </ScrollView>
  );
}

export default DefaultSearchList;
