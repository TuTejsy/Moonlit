import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Results } from 'realm';

import { StorySchema } from '@/database/schema/stories/StorySchema.types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

import StoryPreview from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SearchResultList.styles';

interface SearchResultListPropTypes {
  stories: Results<StorySchema>;
}

function SearchResultList({ stories }: SearchResultListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    return (
      <StoryPreview
        description={item.description}
        isFree={item.is_free}
        previewURL={formatServerFileURLToAbsolutePath(item.preview_cover_url)}
        storyId={item.id}
        title={item.name}
      />
    );
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={stories}
      renderItem={renderItem}
    />
  );
}

export default React.memo(SearchResultList);
