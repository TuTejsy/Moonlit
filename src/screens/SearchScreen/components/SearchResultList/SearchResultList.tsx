import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Results } from 'realm';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { StorySchema } from '@/database/schema/stories/StorySchema.types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SearchResultList.styles';

interface SearchResultListPropTypes {
  stories: Results<StorySchema>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

function SearchResultList({ onScroll, stories }: SearchResultListPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    return (
      <StoryPreview
        description={item.description}
        isFree={item.is_free}
        previewURL={formatServerFileURLToAbsolutePath(item.small_cover_url)}
        storyId={item.id}
        title={item.name}
      />
    );
  }, []);

  const handleScrollToTop = useCallback(() => {
    onScroll?.({
      nativeEvent: {
        contentOffset: { x: 0, y: 0 },
      },
    } as NativeSyntheticEvent<NativeScrollEvent>);
  }, [onScroll]);

  useEffect(() => {
    handleScrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator
      contentContainerStyle={styles.contentContainer}
      data={stories}
      indicatorStyle='white'
      renderItem={renderItem}
      scrollIndicatorInsets={{ top: DEFAULT_HEADER_HEIGHT + insets.top }}
      onScroll={onScroll}
      onScrollToTop={handleScrollToTop}
    />
  );
}

export default React.memo(SearchResultList);
