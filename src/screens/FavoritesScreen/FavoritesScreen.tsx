import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import SmallStoriesList from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SCREEN_WIDTH } from '@/constants/layout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import {
  EXTROPOLATION_CONFIG,
  RECENTLY_PLAYED_STORIES,
  SAVED_STORIES,
  TAB_WIDTH,
} from './FavoritesScreen.constants';
import { makeStyles } from './FavoritesScreen.styles';

function FavoritesScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffsetSharedValue = useScrollViewOffset(scrollViewRef);

  const animatedTabIndicatorStyle = useAnimatedStyle(() => ({
    left: interpolate(
      scrollOffsetSharedValue.value,
      [0, SCREEN_WIDTH],
      [4, TAB_WIDTH - 4],
      EXTROPOLATION_CONFIG,
    ),
  }));

  const animatedSavedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, SCREEN_WIDTH],
      [1, 0.5],
      EXTROPOLATION_CONFIG,
    ),
  }));

  const animatedRecentlyPlayedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, SCREEN_WIDTH],
      [0.5, 1],
      EXTROPOLATION_CONFIG,
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
            contentContainerStyle={styles.listContent}
            stories={SAVED_STORIES}
            ListHeaderComponent={
              <TextView style={styles.listTitleText} type='bold'>
                Your saved tales
              </TextView>
            }
          />
        </View>

        <View style={styles.listContainer}>
          <SmallStoriesList
            contentContainerStyle={styles.listContent}
            stories={RECENTLY_PLAYED_STORIES}
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
