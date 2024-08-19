import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewStyle,
} from 'react-native';

import { StorySchema } from '@/database/schema/stories/types';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { usePreviewLayout } from './components/StoryPreview/hooks/usePreviewLayout';
import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesList.styles';

interface SmallStoriesListPropTypes {
  stories: Array<StorySchema>;
  storiesVersion: number;
  ListFooterComponent?: FlatListProps<StorySchema>['ListFooterComponent'];
  ListHeaderComponent?: FlatListProps<StorySchema>['ListHeaderComponent'];
  contentContainerStyle?: ViewStyle;
  displayCount?: number;
  indicatorStyle?: FlatListProps<StorySchema>['indicatorStyle'];
  isScrollable?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  style?: ViewStyle;
  tab?: TabEventType;
}

export function SmallStoriesList({
  ListFooterComponent,
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
  tab,
}: SmallStoriesListPropTypes) {
  const { horizontalPadding, windowWidth } = useLayout();
  const { previewSize } = usePreviewLayout();

  const numColumns = useMemo(() => {
    return Math.floor((windowWidth - horizontalPadding) / (previewSize + horizontalPadding / 2));
  }, [horizontalPadding, previewSize, windowWidth]);

  const styles = useMakeStyles(makeStyles, { numColumns });

  const storiesToRender = useMemo(() => {
    if (displayCount) {
      return stories.slice(0, displayCount);
    }
    return stories;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayCount, stories, storiesVersion]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<StorySchema>) => {
      return (
        <StoryPreview
          description={item.description}
          isComingSoon={item.is_coming_soon}
          isFree={item.is_free}
          isImageLoaded={!!item.small_cover_cached_name}
          previewURL={getImageFilePathForStory(item, 'small')}
          source={SOURCE.CONTENT}
          storyId={item.id}
          tab={tab}
          title={item.name}
        />
      );
    },
    [tab],
  );

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
    <FlatList
      key={numColumns}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      data={storiesToRender}
      extraData={storiesVersion}
      indicatorStyle={indicatorStyle}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
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
