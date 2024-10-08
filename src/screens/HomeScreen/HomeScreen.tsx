import React, { useCallback, useMemo, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { SmallStoriesPlainList } from '@/components/Lists/SmallStoriesPlainList/SmallStoriesPlainList';
import { POPULAR_STORIES_CONFIG, POPULAR_STORIES_FILTER } from '@/constants/stories';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';
import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';

import { DefaultList } from './components/DefaultList/DefaultList';
import { EmptySearch } from './components/EmptySearch/EmptySearch';
import { PopularSearch } from './components/PopularSearch/PopularSearch';
import { SearchBar } from './components/SearchBar/SearchBar';
import { makeStyles } from './HomeScreen.styles';

export const HomeScreen = () => {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const [searchText, setSearchText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { handleOpacityScroll, opacityAnimStyle } = useScrollOpacity();

  const searchDecriptor = useMemo(() => {
    const trimmedSeacrhText = searchText.trim();

    if (trimmedSeacrhText) {
      return `name CONTAINS[c] "${trimmedSeacrhText}" && is_coming_soon = false`;
    }
    return undefined;
  }, [searchText]);

  const [allStories, allStoriesVersion] = useStories(searchDecriptor);
  const [popularStories, popularStoriesVersion] = useStories(
    POPULAR_STORIES_FILTER,
    POPULAR_STORIES_CONFIG,
    5,
  );

  const popularSearchItems = useMemo(
    () => popularStories.map((story) => story.name),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [popularStoriesVersion],
  );

  const isDefaultListVisible = !searchText && !isInputFocused;

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handlePopularSearchItemSelected = useCallback((item: string) => {
    setSearchText(item);
  }, []);

  useFocusEffect(
    useCallback(() => {
      AnalyticsService.logHomeViewEvent();
    }, []),
  );

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0.3, 1]}
      style={styles.screen}
    >
      <DefaultList
        allStories={allStories}
        allStoriesVersion={allStoriesVersion}
        isListVisible={isDefaultListVisible}
        popularStories={popularStories}
        popularStoriesVersion={popularStoriesVersion}
        onScroll={handleOpacityScroll}
      />

      {searchText ? (
        <LinearGradient
          angle={180}
          colors={[colors.purple, colors.darkPurple]}
          locations={[0.3, 1]}
          style={styles.homeScreen}
        >
          <SmallStoriesPlainList
            ListEmptyComponent={<EmptySearch />}
            source={SOURCE.SEARCH}
            stories={allStories}
            storiesVersion={allStoriesVersion}
            onScroll={handleOpacityScroll}
          />
        </LinearGradient>
      ) : (
        isInputFocused && (
          <LinearGradient
            angle={180}
            colors={[colors.purple, colors.darkPurple]}
            locations={[0.3, 1]}
            style={styles.homeScreen}
          >
            <PopularSearch
              popularSearchItems={popularSearchItems}
              onPopularSearchItemSelected={handlePopularSearchItemSelected}
              onScroll={handleOpacityScroll}
            />
          </LinearGradient>
        )
      )}

      <SearchBar
        opacityAnimStyle={opacityAnimStyle}
        value={searchText}
        onChangeText={handleSearchTextChange}
        onInputBlur={handleInputBlur}
        onInputFocus={handleInputFocus}
      />
    </LinearGradient>
  );
};
