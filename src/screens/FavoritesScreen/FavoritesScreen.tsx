import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SCREEN_WIDTH } from '@/constants/layout';
import useStories from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { TAB_WIDTH } from './FavoritesScreen.constants';
import { makeStyles } from './FavoritesScreen.styles';

function FavoritesScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffsetSharedValue = useScrollViewOffset(scrollViewRef);

  const [savedStories, savedStoriesVersion] = useStories('is_favorite = true', {
    reverse: true,
    sortDescriptor: 'saved_at_timestamp',
  });
  const [recentlyPlayedStories, recentlyPlayedStoriesVersion] = useStories(
    'played_at_timestamp != nil',
    {
      reverse: true,
      sortDescriptor: 'played_at_timestamp',
    },
  );

  const animatedTabIndicatorStyle = useAnimatedStyle(() => ({
    left: interpolate(
      scrollOffsetSharedValue.value,
      [0, SCREEN_WIDTH],
      [4, TAB_WIDTH - 4],
      Extrapolate.CLAMP,
    ),
  }));

  const animatedSavedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, SCREEN_WIDTH],
      [1, 0.5],
      Extrapolate.CLAMP,
    ),
  }));

  const animatedRecentlyPlayedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, SCREEN_WIDTH],
      [0.5, 1],
      Extrapolate.CLAMP,
    ),
  }));

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const scrollPosition = Math.round(contentOffset.x / SCREEN_WIDTH);

      scrollViewRef.current?.scrollTo({ x: scrollPosition * SCREEN_WIDTH });
    },
    [scrollViewRef],
  );

  const handleSavedTabPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: 0 });
  }, [scrollViewRef]);

  const handleRecentlyPlayedTabPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH });
  }, [scrollViewRef]);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.opacityOrange(0.3), colors.black]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <Animated.View style={styles.tabContainer}>
        <Animated.View style={[styles.tabIndicator, animatedTabIndicatorStyle]} />

        <Animated.View style={animatedSavedTabStyle}>
          <TextView style={styles.tabText} type='medium' onPress={handleSavedTabPress}>
            Saved
          </TextView>
        </Animated.View>
        <Animated.View style={animatedRecentlyPlayedTabStyle}>
          <TextView style={styles.tabText} type='medium' onPress={handleRecentlyPlayedTabPress}>
            Recent Played
          </TextView>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEndDrag}
      >
        <View style={styles.listContainer}>
          <SmallStoriesList
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.listContent}
            indicatorStyle='white'
            stories={savedStories}
            ListHeaderComponent={
              <TextView style={styles.listTitleText} type='bold'>
                Your saved tales
              </TextView>
            }
          />
        </View>

        <View style={styles.listContainer}>
          <SmallStoriesList
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.listContent}
            indicatorStyle='white'
            stories={recentlyPlayedStories}
            ListHeaderComponent={
              <TextView style={styles.listTitleText} type='bold'>
                Recent Played
              </TextView>
            }
          />
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}

export default FavoritesScreen;
