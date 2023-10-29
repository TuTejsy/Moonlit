import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { SmallStoriesPlainList } from '@/components/Lists/SmallStoriesPlainList/SmallStoriesPlainList';
import { FREE_STORIES_FILTER, POPULAR_STORIES_CONFIG } from '@/constants/stories';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';

import { DefaultSearchList } from './components/DefaultSearchList/DefaultSearchList';
import { PopularSearch } from './components/PopularSearch/PopularSearch';
import { SearchBar } from './components/SearchBar/SearchBar';
import { makeStyles } from './SearchScreen.styles';

export const SearchScreen = () => {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const [searchText, setSearchText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { handleOpacityScroll, opacityAnimStyle } = useScrollOpacity();

  const searchDecriptor = useMemo(() => {
    const trimmedSeacrhText = searchText.trim();

    if (trimmedSeacrhText) {
      return `name CONTAINS[c] "${trimmedSeacrhText}"`;
    }
    return undefined;
  }, [searchText]);

  const [allStories, allStoriesVersion] = useStories(searchDecriptor);
  const [popularStories, popularStoriesVersion] = useStories(undefined, POPULAR_STORIES_CONFIG);
  const [freeStories, freeStoriesVersion] = useStories(FREE_STORIES_FILTER);

  const popularSearchItems = useMemo(
    () => popularStories.slice(0, 5).map((story) => story.name),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [popularStoriesVersion],
  );

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

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0.3, 1]}
      style={styles.screen}
    >
      <DefaultSearchList
        allStories={allStories}
        allStoriesVersion={allStoriesVersion}
        freeStories={freeStories}
        freeStoriesVersion={freeStoriesVersion}
        popularStories={popularStories}
        popularStoriesVersion={popularStoriesVersion}
        onScroll={handleOpacityScroll}
      />

      {searchText ? (
        <View style={styles.searchScreen}>
          <SmallStoriesPlainList
            stories={allStories}
            storiesVersion={allStoriesVersion}
            onScroll={handleOpacityScroll}
          />
        </View>
      ) : (
        isInputFocused && (
          <View style={styles.searchScreen}>
            <PopularSearch
              popularSearchItems={popularSearchItems}
              onPopularSearchItemSelected={handlePopularSearchItemSelected}
              onScroll={handleOpacityScroll}
            />
          </View>
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
