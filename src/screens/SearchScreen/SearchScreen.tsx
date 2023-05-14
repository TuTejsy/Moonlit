import React from 'react';
import { Image, ScrollView } from 'react-native';

import { noop } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import PromotionBannerImage from '@/assets/images/PromotionBanner/PromotionBanner.png';
import MediumStoriesList from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import CategoriesList from '../HomeScreen/components/CategoriesList/CategoriesList';
import SectionHeader from '../HomeScreen/components/SectionHeader/SectionHeader';

import SearchBar from './components/SearchBar/SearchBar';
import { ALL_STORIES, POPULAR_STORIES } from './SearchScreen.constants';
import { makeStyles } from './SearchScreen.styles';

function SearchScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.opacityOrange(0.3), colors.black]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <SearchBar />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title='Popular tales' onSeeAllPress={noop} />
        <MediumStoriesList stories={POPULAR_STORIES} style={styles.popularList} />

        <CategoriesList />

        <Image resizeMode='cover' source={PromotionBannerImage} style={styles.promotionBanner} />

        <SectionHeader title='Free tales' onSeeAllPress={noop} />
        <MediumStoriesList stories={[...POPULAR_STORIES].reverse()} style={styles.freeList} />

        <SectionHeader title='All tales' onSeeAllPress={noop} />
        <SmallStoriesList isScrollable={false} stories={ALL_STORIES} style={styles.smallList} />
      </ScrollView>
    </LinearGradient>
  );
}

export default SearchScreen;
