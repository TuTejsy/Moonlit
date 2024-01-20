import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatListProps,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewStyle,
} from 'react-native';

import Animated from 'react-native-reanimated';

import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesList.styles';

interface SmallStoriesListPropTypes {
  stories: Array<StorySchema>;
  storiesVersion: number;
  ListHeaderComponent?: FlatListProps<StorySchema>['ListHeaderComponent'];
  contentContainerStyle?: ViewStyle;
  displayCount?: number;
  indicatorStyle?: FlatListProps<StorySchema>['indicatorStyle'];
  isScrollable?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  style?: ViewStyle;
}

export function SmallStoriesList({
  ListHeaderComponent,
  contentContainerStyle,
  displayCount,
  indicatorStyle,
  isScrollable = true,
  onScroll,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = true,
  stories,
  storiesVersion,
  style,
}: SmallStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const storiesToRender = useMemo(() => {
    if (displayCount) {
      return stories.slice(0, displayCount);
    }
    return stories;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayCount, stories, storiesVersion]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    return (
      <StoryPreview
        description={item.description}
        isFree={item.is_free}
        isImageLoaded={!!item.small_cover_cached_name}
        previewURL={getImageFilePathForStory(item, 'small')}
        storyId={item.id}
        title={item.name}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: StorySchema) => `${item.id}`, []);

  const handleScrollToTop = useCallback(() => {
    if (typeof onScroll === 'function') {
      onScroll({
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    }
  }, [onScroll]);

  useEffect(() => {
    handleScrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      data={storiesToRender}
      extraData={storiesVersion}
      indicatorStyle={indicatorStyle}
      keyExtractor={keyExtractor}
      numColumns={2}
      renderItem={renderItem}
      scrollEnabled={isScrollable}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={style}
      onScroll={onScroll}
      onScrollToTop={handleScrollToTop}
    />
  );
}
