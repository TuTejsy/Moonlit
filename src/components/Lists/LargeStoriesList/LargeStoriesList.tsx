import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { ListStory } from '../Lists.types';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './LargeStoriesList.styles';

interface LargeStoriesListPropTypes {
  stories: Array<ListStory>;
}

function LargeStoriesList({ stories }: LargeStoriesListPropTypes) {
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
      horizontal
      contentContainerStyle={styles.listContent}
      data={stories}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
}

export default LargeStoriesList;
