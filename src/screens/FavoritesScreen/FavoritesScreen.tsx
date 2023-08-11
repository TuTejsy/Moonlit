import React, { useCallback, useState } from 'react';
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
import { ScrollShadow } from '@/components/Primitives/ScrollShadow/ScrollShadow';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SCREEN_WIDTH } from '@/constants/layout';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';

import { TAB_WIDTH } from './FavoritesScreen.constants';
import { makeStyles } from './FavoritesScreen.styles';

function FavoritesScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffsetSharedValue = useScrollViewOffset(scrollViewRef);

  const [isFirstTabScrolled, setIsFirstTabScrolled] = useState(false);
  const [isSecondTabScrolled, setIsSecondTabScrolled] = useState(false);

  const { handleOpacityScroll, opacityAnimStyle } = useScrollOpacity();

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
    scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH });
    changeBarColor(isSecondTabScrolled);
  }, [changeBarColor, isSecondTabScrolled, scrollViewRef]);

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const scrollPosition = Math.round(contentOffset.x / SCREEN_WIDTH);

      scrollViewRef.current?.scrollTo({ x: scrollPosition * SCREEN_WIDTH });

      const isScrolled = scrollPosition === 1 ? isSecondTabScrolled : isFirstTabScrolled;
      changeBarColor(isScrolled);
    },
    [changeBarColor, isFirstTabScrolled, isSecondTabScrolled, scrollViewRef],
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
        onScrollEndDrag={handleScrollEndDrag}
      >
        <View style={styles.listContainer}>
          <SmallStoriesList
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.listContent}
            indicatorStyle='white'
            showsVerticalScrollIndicator={false}
            stories={savedStories}
            ListHeaderComponent={
              <TextView style={styles.listTitleText} type='bold'>
                Your saved tales
              </TextView>
            }
            onScroll={handleFirstTabScroll}
          />
        </View>

        <View style={styles.listContainer}>
          <SmallStoriesList
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            stories={recentlyPlayedStories}
            ListHeaderComponent={
              <TextView style={styles.listTitleText} type='bold'>
                Recent Played
              </TextView>
            }
            onScroll={handleSecondTabScroll}
          />
        </View>
      </Animated.ScrollView>

      <View style={styles.blurViewContainer}>
        <View style={styles.contentContainer}>
          <ScrollShadow gradientStyle={styles.gradient} opacityAnimStyle={opacityAnimStyle} />

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
}

export default FavoritesScreen;
