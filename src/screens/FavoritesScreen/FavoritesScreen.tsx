import React, { useCallback, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Empty } from '@/components/Empty/Empty';
import { SmallStoriesPlainList } from '@/components/Lists/SmallStoriesPlainList/SmallStoriesPlainList';
import { ScrollShadow } from '@/components/Primitives/ScrollShadow/ScrollShadow';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useStories } from '@/hooks/database/useStories';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAnimatedScrollHandlerValue } from '@/hooks/useAnimatedScrollHandlerValue';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';
import { AnalyticsService } from '@/services/analytics/analytics';

import { makeStyles } from './FavoritesScreen.styles';

export const FavoritesScreen = () => {
  const { colors } = useTheme();
  const { horizontalPadding, sufficientWindowWidth, windowWidth } = useLayout();

  const tabWidth = useMemo(
    () => (sufficientWindowWidth - horizontalPadding * 2 - 8) / 2,
    [horizontalPadding, sufficientWindowWidth],
  );

  const styles = useMakeStyles(makeStyles, { tabWidth });

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const { handleAnimatedScroll, scrollPositionSharedValue: scrollOffsetSharedValue } =
    useAnimatedScrollHandlerValue({ horizontal: true });

  const startScrollPositionRef = useRef(0);

  const [isFirstTabScrolled, setIsFirstTabScrolled] = useState(false);
  const [isSecondTabScrolled, setIsSecondTabScrolled] = useState(false);

  const { handleOpacityScroll, opacityAnimStyle } = useScrollOpacity();

  const [savedStories, savedStoriesVersion] = useStories('is_favorite = true', [
    {
      reverse: true,
      sortDescriptor: 'saved_at_timestamp',
    },
  ]);
  const [recentlyPlayedStories, recentlyPlayedStoriesVersion] = useStories(
    'played_at_timestamp != nil',
    [
      {
        reverse: true,
        sortDescriptor: 'played_at_timestamp',
      },
    ],
  );

  const animatedTabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollOffsetSharedValue.value,
          [0, windowWidth],
          [4, tabWidth - 4],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const animatedSavedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, windowWidth],
      [1, 0.5],
      Extrapolation.CLAMP,
    ),
  }));

  const animatedRecentlyPlayedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, windowWidth],
      [0.5, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const changeBarColor = useCallback(
    (isTabScrolled: boolean) => {
      const offset = isTabScrolled ? 10 : 0;

      handleOpacityScroll({
        nativeEvent: {
          contentOffset: { x: 0, y: offset },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    },
    [handleOpacityScroll],
  );

  const handleSavedTabPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: 0 });
    changeBarColor(isFirstTabScrolled);
  }, [changeBarColor, isFirstTabScrolled, scrollViewRef]);

  const handleRecentlyPlayedTabPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: windowWidth });
    changeBarColor(isSecondTabScrolled);
  }, [changeBarColor, isSecondTabScrolled, scrollViewRef, windowWidth]);

  const handleBeginEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    startScrollPositionRef.current = contentOffset.x;
  }, []);

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const scrollPosition = Math.round(contentOffset.x / windowWidth);

      const scrollDiff = contentOffset.x - startScrollPositionRef.current;

      if (Math.abs(scrollDiff) > 70) {
        if (scrollDiff > 0) {
          scrollViewRef.current?.scrollTo({ x: windowWidth });
        } else {
          scrollViewRef.current?.scrollTo({ x: 0 });
        }
      } else {
        scrollViewRef.current?.scrollTo({ x: scrollPosition * windowWidth });
      }

      const isScrolled = scrollPosition === 1 ? isSecondTabScrolled : isFirstTabScrolled;
      changeBarColor(isScrolled);
    },
    [changeBarColor, isFirstTabScrolled, isSecondTabScrolled, scrollViewRef, windowWidth],
  );

  const handleFirstTabScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = event.nativeEvent.contentOffset;

      if (y > 0) {
        setIsFirstTabScrolled(true);
        changeBarColor(true);
      } else {
        setIsFirstTabScrolled(false);
        changeBarColor(false);
      }
    },
    [changeBarColor],
  );

  const handleSecondTabScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = event.nativeEvent.contentOffset;

      if (y > 0) {
        setIsSecondTabScrolled(true);
        changeBarColor(true);
      } else {
        setIsSecondTabScrolled(false);
        changeBarColor(false);
      }
    },
    [changeBarColor],
  );

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
        scrollEventThrottle={16}
        onScroll={handleAnimatedScroll}
        onScrollBeginDrag={handleBeginEndDrag}
        onScrollEndDrag={handleScrollEndDrag}
      >
        <View style={styles.listContainer}>
          <SmallStoriesPlainList
            showSaveButton
            ListEmptyComponent={<Empty text={`You don't have any\nsaved stories`} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            stories={savedStories}
            storiesVersion={savedStoriesVersion}
            tab='Saved'
            ListHeaderComponent={
              savedStories.length ? (
                <TextView style={styles.listTitleText} type='bold'>
                  Your saved tales
                </TextView>
              ) : undefined
            }
            onScroll={handleFirstTabScroll}
          />
        </View>

        <View style={styles.listContainer}>
          <SmallStoriesPlainList
            showsHorizontalScrollIndicator
            ListEmptyComponent={<Empty text={`You don't have any\nrecent played stories`} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            stories={recentlyPlayedStories}
            storiesVersion={recentlyPlayedStoriesVersion}
            tab='Recent played'
            ListHeaderComponent={
              recentlyPlayedStories.length ? (
                <TextView style={styles.listTitleText} type='bold'>
                  Recent Played
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
                Saved
              </TextView>
            </Animated.View>
            <Animated.View style={animatedRecentlyPlayedTabStyle}>
              <TextView style={styles.tabText} type='medium' onPress={handleRecentlyPlayedTabPress}>
                Recent Played
              </TextView>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};
