import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { ListStory } from '../Lists.types';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './MediumStoriesList.styles';

interface MediumStoriesListPropTypes {
  stories: Array<ListStory>;
}

function MediumStoriesList({ stories }: MediumStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ListStory>) => {
    return <StoryPreview imageSource={item.image} title={item.title} />;
  }, []);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.featuringListContent}
      data={stories}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.featuringList}
    />
  );
}

export default MediumStoriesList;
