import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Realm from 'realm';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useRenderVersion } from '@/hooks/useRenderVersion';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { generateMapStoriesToSaved } from '@/utils/generators/generateMapStoriesToSaved';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesPlainList.styles';

interface SmallStoriesPlainListPropTypes
  extends Omit<FlatListProps<StorySchema>, 'data' | 'renderItem'> {
  source: SOURCE;
  stories: Realm.Results<StorySchema>;
  storiesVersion: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showSaveButton?: boolean;
  tab?: TabEventType;
}

export const SmallStoriesPlainList = React.memo(
  ({
    onScroll,
    showSaveButton = false,
    source,
    stories,
    storiesVersion,
    tab,
    ...props
  }: SmallStoriesPlainListPropTypes) => {
    const styles = useMakeStyles(makeStyles);
    const insets = useSafeAreaInsets();

    const { increaseRenderVersion, renderVersion } = useRenderVersion(storiesVersion);

    const mapStoriesToSaved = useMemo(
      () => generateMapStoriesToSaved(stories),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [stories, storiesVersion],
    );

    const handleSaveStoryPress = useCallback(
      (storyId: number) => {
        const isSaved = mapStoriesToSaved.get(storyId);

        mapStoriesToSaved.set(storyId, !isSaved);
        increaseRenderVersion();
      },
      [increaseRenderVersion, mapStoriesToSaved],
    );

    const renderItem = useCallback(
      ({ item }: ListRenderItemInfo<StorySchema>) => {
        return (
          <StoryPreview
            description={item.description}
            isFree={item.is_free}
            isSaved={mapStoriesToSaved.get(item.id)}
            previewURL={getImageFilePathForStory(item, 'small')}
            showSaveButton={showSaveButton}
            source={source}
            storyId={item.id}
            tab={tab}
            title={item.name}
            onSaveStoryPress={handleSaveStoryPress}
          />
        );
      },
      [handleSaveStoryPress, mapStoriesToSaved, showSaveButton, source, tab],
    );

    const handleScrollToTop = useCallback(() => {
      onScroll?.({
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    }, [onScroll]);

    useEffect(() => {
      handleScrollToTop();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFocusEffect(
      useCallback(
        () => () => {
          if (showSaveButton) {
            const ids = Array.from(mapStoriesToSaved.keys()).filter(
              (storyId) => !mapStoriesToSaved.get(storyId),
            );

            StoriesDB.update(ids, (story) => {
              story.is_favorite = false;
              story.saved_at_timestamp = undefined;
            });
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [mapStoriesToSaved],
      ),
    );

    return (
      <FlatList
        showsVerticalScrollIndicator
        contentContainerStyle={styles.contentContainer}
        data={stories}
        extraData={renderVersion}
        indicatorStyle='white'
        keyboardDismissMode='on-drag'
        renderItem={renderItem}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ top: DEFAULT_HEADER_HEIGHT + insets.top }}
        onScroll={onScroll}
        onScrollToTop={handleScrollToTop}
        {...props}
      />
    );
  },
);
