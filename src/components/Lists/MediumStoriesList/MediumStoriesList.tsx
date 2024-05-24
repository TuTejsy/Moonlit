import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, ViewStyle } from 'react-native';

import Realm from 'realm';

import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './MediumStoriesList.styles';

interface MediumStoriesListPropTypes {
  stories: Realm.Results<StorySchema>;
  storiesVersion: number;
  style?: ViewStyle;
  tab?: TabEventType;
}

export function MediumStoriesList({
  stories,
  storiesVersion,
  style,
  tab,
}: MediumStoriesListPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<StorySchema>) => {
      const isImageLoaded = !!item.medium_cover_cached_name;

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
              ? getImageFilePathForStory(item, 'medium')
              : getImageFilePathForStory(item, 'small')
          }
        />
      );
    },
    [tab],
  );

  const keyExtractor = useCallback((item: StorySchema, index: number) => `${item.id}`, []);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContent}
      data={stories}
      extraData={storiesVersion}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={[styles.list, style]}
    />
  );
}
