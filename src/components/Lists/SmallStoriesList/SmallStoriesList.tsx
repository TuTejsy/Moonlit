import React, { useCallback, useMemo } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo, ViewStyle } from 'react-native';

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
        previewURL={formatServerFileURLToAbsolutePath(item.preview_cover_url)}
        storyId={item.id}
        title={item.name}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: StorySchema) => `${item.id}`, []);

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
    />
  );
}

export default SmallStoriesList;
