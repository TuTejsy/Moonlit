import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './LargeStoriesList.styles';

interface LargeStoriesListPropTypes {
  stories: ArrayLike<StorySchema>;
  storiesVersion: number;
  tab?: TabEventType;
}

export function LargeStoriesList({ stories, storiesVersion, tab }: LargeStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<StorySchema>) => {
      const isImageLoaded = !!item.full_cover_cached_name;

      return (
        <StoryPreview
          description={item.description}
          isFree={item.is_free}
          isImageLoaded={isImageLoaded}
          source={SOURCE.CONTENT}
          storyId={item.id}
          tab={tab}
          title={item.name}
          previewURL={
            isImageLoaded
              ? getImageFilePathForStory(item, 'full')
              : getImageFilePathForStory(item, 'small')
          }
        />
      );
    },
    [tab],
  );

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
