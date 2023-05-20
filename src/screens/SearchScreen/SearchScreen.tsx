import React, { useCallback, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import DefaultSearchList from './components/DefaultSearchList/DefaultSearchList';
import SearchBar from './components/SearchBar/SearchBar';
import { makeStyles } from './SearchScreen.styles';

function SearchScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  const [searchText, setSearchText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [allStories, allStoriesVersion] = useStories();
  const [popularStories, popularStoriesVersion] = useStories(undefined, {
    reverse: true,
    sortDescriptor: 'played_count',
  });
  const [freeStories, freeStoriesVersion] = useStories('is_free = true');

  const popularSearch = popularStories.slice(0, 5).map((story) => story.name);

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

      <DefaultSearchList
        allStories={allStories}
        freeStories={freeStories}
        popularStories={popularStories}
      />
    </LinearGradient>
  );
}

export default SearchScreen;
