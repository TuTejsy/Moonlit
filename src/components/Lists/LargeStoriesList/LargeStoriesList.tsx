import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Results } from 'realm';

import { SUPABASE_URL } from '@/constants/common';
import { StorySchema } from '@/database/schema/stories/StorySchema.types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './LargeStoriesList.styles';

interface LargeStoriesListPropTypes {
  stories: Results<StorySchema>;
}

function LargeStoriesList({ stories }: LargeStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    const previewURL = `${SUPABASE_URL}${item.full_cover_url}`;
    return <StoryPreview previewURL={previewURL} title={item.name} />;
  }, []);

  const keyExtractor = useCallback(
    (item: StorySchema, index: number) => `${item.name}-${index}`,
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
