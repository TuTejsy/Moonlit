import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Results } from 'realm';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './LargeStoriesList.styles';

import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

interface LargeStoriesListPropTypes {
  stories: Results<StorySchema>;
  storiesVersion: number;
}

function LargeStoriesList({ stories, storiesVersion }: LargeStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    return (
      <StoryPreview
        description={item.description}
        isFree={item.is_free}
        previewURL={formatServerFileURLToAbsolutePath(item.full_cover_url)}
        storyId={item.id}
        title={item.name}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: StorySchema) => `${item.id}`, []);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContent}
      data={stories}
      extraData={storiesVersion}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
}

export default LargeStoriesList;
