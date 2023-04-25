import React from 'react';
import { ScrollView, Image } from 'react-native';

import { noop } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import LargeStoriesList from '@/components/Lists/LargeStoriesList/LargeStoriesList';
import MediumStoriesList from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import CategoriesList from './components/CategoriesList/CategoriesList';
import SectionHeader from './components/SectionHeader/SectionHeader';
import { ALL_STORIES, FEATURING_STORIES, POPULAR_STORIES } from './HomeScreen.constants';
import { makeStyles } from './HomeScreen.styles';
import PromotionBannerImage from './images/PromotionBanner/PromotionBanner.png';

function HomeScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.orange, colors.black]}
      locations={[0.5, 0.5]}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          angle={180}
          colors={[colors.orange, colors.black]}
          locations={[0.2, 0.8]}
          style={styles.gradient}
        >
          <SectionHeader title='Featuring tales' onSeeAllPress={noop} />

          <LargeStoriesList stories={FEATURING_STORIES} />
          <CategoriesList />

          <SectionHeader title='Popular tales' onSeeAllPress={noop} />
          <MediumStoriesList stories={POPULAR_STORIES} />
        </LinearGradient>

        <Image resizeMode='cover' source={PromotionBannerImage} style={styles.promotionBanner} />

        <SectionHeader title='Free tales' onSeeAllPress={noop} />
        <MediumStoriesList stories={[...POPULAR_STORIES].reverse()} />

        <SectionHeader title='All tales' onSeeAllPress={noop} />
        <SmallStoriesList isScrollable={false} stories={ALL_STORIES} style={styles.smallList} />
      </ScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
