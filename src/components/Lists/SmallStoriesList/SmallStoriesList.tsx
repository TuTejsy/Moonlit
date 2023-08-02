import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';

import { Results } from 'realm';

import { StorySchema } from '@/database/schema/stories/StorySchema.types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesList.styles';

interface SmallStoriesListPropTypes {
  stories: Results<StorySchema>;
  ListHeaderComponent?: FlatListProps<StorySchema>['ListHeaderComponent'];
  contentContainerStyle?: ViewStyle;
  displayCount?: number;
  extraData?: number;
  indicatorStyle?: FlatListProps<StorySchema>['indicatorStyle'];
  isScrollable?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showsHorizontalScrollIndicator?: boolean;
  style?: ViewStyle;
}

function SmallStoriesList({
  ListHeaderComponent,
  contentContainerStyle,
  displayCount,
  extraData,
  indicatorStyle,
  isScrollable = true,
  onScroll,
  showsHorizontalScrollIndicator = false,
  stories,
  style,
}: SmallStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const storiesToRender = useMemo(() => {
    if (displayCount) {
      return stories.slice(0, displayCount);
    }
    return stories;
  }, [displayCount, stories]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    return (
      <StoryPreview
        description={item.description}
        isFree={item.is_free}
        previewURL={formatServerFileURLToAbsolutePath(item.small_preview_cover_url)}
        storyId={item.id}
        title={item.name}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: StorySchema) => `${item.id}`, []);

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
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      data={storiesToRender}
      extraData={extraData}
      indicatorStyle={indicatorStyle}
      keyExtractor={keyExtractor}
      numColumns={2}
      renderItem={renderItem}
      scrollEnabled={isScrollable}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      style={style}
      onScroll={onScroll}
      onScrollToTop={handleScrollToTop}
    />
  );
}

export default SmallStoriesList;
