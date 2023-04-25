import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, ViewStyle } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { ListStory } from '../Lists.types';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesList.styles';

interface SmallStoriesListPropTypes {
  stories: Array<ListStory>;
  contentStyle?: ViewStyle;
  isScrollable?: boolean;
  style?: ViewStyle;
}

function SmallStoriesList({
  contentStyle,
  isScrollable = true,
  stories,
  style,
}: SmallStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ListStory>) => {
    return <StoryPreview imageSource={item.image} title={item.title} />;
  }, []);

  return (
    <FlatList
      contentContainerStyle={[styles.featuringListContent, contentStyle]}
      data={stories}
      numColumns={2}
      renderItem={renderItem}
      scrollEnabled={isScrollable}
      showsHorizontalScrollIndicator={false}
      style={[styles.featuringList, style]}
    />
  );
}

export default SmallStoriesList;
