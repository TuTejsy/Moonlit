import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { Empty } from '@/components/Empty/Empty';
import { SmallStoriesPlainList } from '@/components/Lists/SmallStoriesPlainList/SmallStoriesPlainList';
import { ScrollShadow } from '@/components/Primitives/ScrollShadow/ScrollShadow';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAnimatedScrollHandlerValue } from '@/hooks/useAnimatedScrollHandlerValue';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { AnalyticsService } from '@/services/analytics/analytics';

import { makeStyles } from './FavoritesScreen.styles';
import { useFavoritesData } from './hooks/useFavoritesData';
import { useTabBarScrollSync } from './hooks/useTabBarScrollSync';

export const FavoritesScreen = () => {
  const { colors } = useTheme();
  const { horizontalPadding, sufficientWindowWidth, windowWidth } = useLayout();
  const { localize } = useAppLocalization();

  const tabWidth = useMemo(
    () => (sufficientWindowWidth - horizontalPadding * 2 - 8) / 2,
    [horizontalPadding, sufficientWindowWidth],
  );

  const styles = useMakeStyles(makeStyles, { tabWidth });

  const { handleAnimatedScroll, scrollPositionSharedValue: scrollOffsetSharedValue } =
    useAnimatedScrollHandlerValue({ horizontal: true });

  const { handleOpacityScroll, opacityAnimStyle } = useScrollOpacity();

  const { recentlyPlayedStories, recentlyPlayedStoriesVersion, savedStories, savedStoriesVersion } =
    useFavoritesData();

  const {
    animatedRecentlyPlayedTabStyle,
    animatedSavedTabStyle,
    animatedTabIndicatorStyle,
    handleBeginEndDrag,
    handleFirstTabScroll,
    handleRecentlyPlayedTabPress,
    handleSavedTabPress,
    handleScrollEndDrag,
    handleSecondTabScroll,
    scrollViewRef,
  } = useTabBarScrollSync({
    handleOpacityScroll,
    scrollOffsetSharedValue,
    tabWidth,
    windowWidth,
  });

  useFocusEffect(
    useCallback(() => {
      AnalyticsService.logSavedViewEvent();
    }, []),
  );

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0.3, 1]}
      style={styles.screen}
    >
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleAnimatedScroll}
        onScrollBeginDrag={handleBeginEndDrag}
        onScrollEndDrag={handleScrollEndDrag}
      >
        <View style={styles.listContainer}>
          <SmallStoriesPlainList
            showSaveButton
            ListEmptyComponent={<Empty text={localize('favorites', 'emptyListTitle')} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            stories={savedStories}
            storiesVersion={savedStoriesVersion}
            tab='Saved'
            ListHeaderComponent={
              savedStories.length ? (
                <TextView style={styles.listTitleText} type='bold'>
                  {localize('stories', 'yourSavedTales')}
                </TextView>
              ) : undefined
            }
            onScroll={handleFirstTabScroll}
          />
        </View>

        <View style={styles.listContainer}>
          <SmallStoriesPlainList
            showsHorizontalScrollIndicator
            ListEmptyComponent={<Empty text={localize('stories', 'emptyRecentListTitle')} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            stories={recentlyPlayedStories}
            storiesVersion={recentlyPlayedStoriesVersion}
            tab='Recent played'
            ListHeaderComponent={
              recentlyPlayedStories.length ? (
                <TextView style={styles.listTitleText} type='bold'>
                  {localize('stories', 'recentPlayed')}
                </TextView>
              ) : undefined
            }
            onScroll={handleSecondTabScroll}
          />
        </View>
      </Animated.ScrollView>

      <View style={styles.blurViewContainer}>
        <View style={styles.contentContainer}>
          <ScrollShadow gradientStyle={styles.tabsGradient} opacityAnimStyle={opacityAnimStyle} />

          <Animated.View style={styles.tabContainer}>
            <Animated.View style={[styles.tabIndicator, animatedTabIndicatorStyle]} />

            <Animated.View style={animatedSavedTabStyle}>
              <TextView style={styles.tabText} type='medium' onPress={handleSavedTabPress}>
                {localize('common', 'saved')}
              </TextView>
            </Animated.View>
            <Animated.View style={animatedRecentlyPlayedTabStyle}>
              <TextView style={styles.tabText} type='medium' onPress={handleRecentlyPlayedTabPress}>
                {localize('stories', 'recentPlayed')}
              </TextView>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};
