/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback } from 'react';
import { FlatList, ImageSourcePropType, ListRenderItemInfo } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './FeaturingList.styles';

const STORIES = [
  {
    image: require('./images/story1/story1.png') as ImageSourcePropType,
    title: 'The Elves and the Shoemaker',
  },
  {
    image: require('./images/story2/story2.png') as ImageSourcePropType,
    title: 'The Twelve Dancing Princesses',
  },
];

function FeaturingList() {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<(typeof STORIES)[0]>) => {
    return <StoryPreview imageSource={item.image} title={item.title} />;
  }, []);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.featuringListContent}
      data={STORIES}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.featuringList}
    />
  );
}

export default FeaturingList;
