import React, { useCallback, useMemo, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import DefaultSearchList from './components/DefaultSearchList/DefaultSearchList';
import PopularSearch from './components/PopularSearch/PopularSearch';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResultList from './components/SearchResultList/SearchResultList';
import { makeStyles } from './SearchScreen.styles';

function SearchScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const [searchText, setSearchText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchDecriptor = useMemo(() => {
    const trimmedSeacrhText = searchText.trim();

    if (trimmedSeacrhText) {
      return `name CONTAINS[c] "${trimmedSeacrhText}"`;
    }
    return undefined;
  }, [searchText]);

  const [allStories, allStoriesVersion] = useStories(searchDecriptor);
  const [popularStories, popularStoriesVersion] = useStories(undefined, {
    reverse: true,
    sortDescriptor: 'played_count',
  });
  const [freeStories, freeStoriesVersion] = useStories('is_free = true');
  const popularSearchItems = popularStories.slice(0, 5).map((story) => story.name);

  const orangeOpacity = searchText ? 0.15 : 0.3;

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
      colors={[colors.opacityOrange(orangeOpacity), colors.opacityOrange(0)]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <SearchBar
        value={searchText}
        onChangeText={handleSearchTextChange}
        onInputBlur={handleInputBlur}
        onInputFocus={handleInputFocus}
      />

      {searchText ? (
        <SearchResultList stories={allStories} />
      ) : isInputFocused ? (
        <PopularSearch
          popularSearchItems={popularSearchItems}
          onPopularSearchItemSelected={handlePopularSearchItemSelected}
        />
      ) : (
        <DefaultSearchList
          allStories={allStories}
          freeStories={freeStories}
          popularStories={popularStories}
        />
      )}
    </LinearGradient>
  );
}

export default SearchScreen;
