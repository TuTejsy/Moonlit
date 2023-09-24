import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

import { noop } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import LargeStoriesList from '@/components/Lists/LargeStoriesList/LargeStoriesList';
import MediumStoriesList from '@/components/Lists/MediumStoriesList/MediumStoriesList';
import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { PromotionBanner } from '@/components/PromotionBanner/PromotionBanner';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import CategoriesList from './components/CategoriesList/CategoriesList';
import SectionHeader from './components/SectionHeader/SectionHeader';
import { makeStyles } from './HomeScreen.styles';
import { useStoriesUpdate } from './hooks/useStoriesUpdate';

function HomeScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const [isRefreshing, updateStories] = useStoriesUpdate();

  const [allStories, allStoriesVersion] = useStories();
  const [popularStories, popularStoriesVersion] = useStories(undefined, {
    reverse: true,
    sortDescriptor: 'played_count',
  });
  const [freeStories, freeStoriesVersion] = useStories('is_free = true');

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
          <SectionHeader title='Featuring tales' onSeeAllPress={noop} />

          <LargeStoriesList stories={allStories} storiesVersion={allStoriesVersion} />
          <CategoriesList />

          <SectionHeader title='Popular tales' onSeeAllPress={noop} />
          <MediumStoriesList
            stories={popularStories}
            storiesVersion={popularStoriesVersion}
            style={styles.mediumList}
          />
        </LinearGradient>

        <PromotionBanner style={styles.promotionBanner} />

        <SectionHeader title='Free tales' onSeeAllPress={noop} />
        <MediumStoriesList
          stories={freeStories}
          storiesVersion={freeStoriesVersion}
          style={styles.mediumList}
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
    </LinearGradient>
  );
}

export default HomeScreen;
