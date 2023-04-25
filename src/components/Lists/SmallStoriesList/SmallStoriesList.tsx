import React, { useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo, ViewStyle } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { ListStory } from '../Lists.types';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesList.styles';

interface SmallStoriesListPropTypes {
  stories: Array<ListStory>;
  ListHeaderComponent?: FlatListProps<ListStory>['ListHeaderComponent'];
  contentContainerStyle?: ViewStyle;
  indicatorStyle?: FlatListProps<ListStory>['indicatorStyle'];
  isScrollable?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  style?: ViewStyle;
}

function SmallStoriesList({
  ListHeaderComponent,
  contentContainerStyle,
  indicatorStyle,
  isScrollable = true,
  showsHorizontalScrollIndicator = false,
  stories,
  style,
}: SmallStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ListStory>) => {
    return <StoryPreview imageSource={item.image} title={item.title} />;
  }, []);

  const keyExtractor = useCallback(
    (item: ListStory, index: number) => `${item.title}-${index}`,
    [],
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      data={stories}
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
