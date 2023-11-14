import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Results } from 'realm';

import { SANDBOX } from '@/constants/common';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { StoriesDB } from '@/database';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { generateMapStoriesToSaved } from '@/utils/generators/generateMapStoriesToSaved';

import { StoryPreview } from './components/StoryPreview/StoryPreview';
import { makeStyles } from './SmallStoriesPlainList.styles';

interface SmallStoriesPlainListPropTypes
  extends Omit<FlatListProps<StorySchema>, 'data' | 'renderItem'> {
  stories: Results<StorySchema>;
  storiesVersion: number;

  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showSaveButton?: boolean;
}

export const SmallStoriesPlainList = React.memo(
  ({
    onScroll,
    showSaveButton = false,
    stories,
    storiesVersion,
    ...props
  }: SmallStoriesPlainListPropTypes) => {
    const styles = useMakeStyles(makeStyles);
    const insets = useSafeAreaInsets();
    const [savedVersion, setSavedVersion] = useState(0);

    const mapStoriesToSaved = useMemo(
      () => generateMapStoriesToSaved(stories),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [stories, storiesVersion],
    );

    const handleSaveStoryPress = useCallback(
      (storyId: number) => {
        const isSaved = mapStoriesToSaved.get(storyId);

        mapStoriesToSaved.set(storyId, !isSaved);
        setSavedVersion(savedVersion + 1);
      },
      [mapStoriesToSaved, savedVersion],
    );

    const renderItem = useCallback(
      ({ item }: ListRenderItemInfo<StorySchema>) => {
        return (
          <StoryPreview
            description={item.description}
            isFree={item.is_free}
            isSaved={mapStoriesToSaved.get(item.id)}
            previewURL={`file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${item.small_cover_cached_name}`}
            showSaveButton={showSaveButton}
            storyId={item.id}
            title={item.name}
            onSaveStoryPress={handleSaveStoryPress}
          />
        );
      },
      [handleSaveStoryPress, mapStoriesToSaved, showSaveButton],
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
        extraData={storiesVersion + savedVersion}
        indicatorStyle='white'
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
