import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Results } from 'realm';

import { SANDBOX } from '@/constants/common';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useRenderVersion } from '@/hooks/useRenderVersion';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './LargeStoriesList.styles';

interface LargeStoriesListPropTypes {
  stories: Results<StorySchema>;
  storiesVersion: number;
}

export function LargeStoriesList({ stories, storiesVersion }: LargeStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const { renderVersion } = useRenderVersion();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<StorySchema>) => {
    return (
      <StoryPreview
        description={item.description}
        isFree={item.is_free}
        isImageLoaded={!!item.full_cover_cached_name}
        previewURL={`file://${SANDBOX.DOCUMENTS.FULL_COVER}/${item.full_cover_cached_name}`}
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
      extraData={storiesVersion + renderVersion}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
}
