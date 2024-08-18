import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, ViewStyle } from 'react-native';

import Realm from 'realm';

import { StorySchema } from '@/database/schema/stories/types';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { PREVIEW_WIDTH } from './components/StoryPreview/StoryPreview.constants';
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

  const { horizontalPadding, windowWidth } = useLayout();

  const isScrollEnabled = useMemo(() => {
    return PREVIEW_WIDTH * stories.length > windowWidth - horizontalPadding * 2;
  }, [horizontalPadding, stories.length, windowWidth]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<StorySchema>) => {
      const isImageLoaded = !!item.medium_cover_cached_name;

      return (
        <StoryPreview
          description={item.description}
          isFree={item.is_free}
          isImageLoaded={isImageLoaded}
          previewURL={getImageFilePathForStory(item, 'medium')}
          source={SOURCE.CONTENT}
          storyId={item.id}
          tab={tab}
          title={item.name}
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
      scrollEnabled={isScrollEnabled}
      showsHorizontalScrollIndicator={false}
      style={[styles.list, style]}
    />
  );
}
