import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { SelectStoryCell } from './components/SelectStoryCell/SelectStoryCell';
import { TEST_ID_SELECT_STORY_LIST } from './SelectStoryList.constants';
import { makeStyles } from './SelectStoryList.styles';
import { SelectStoryListProps } from './SelectStoryList.types';

export const SelectStoryList = React.memo(
  ({ onStorySelect, selectedStoryId, stories, storiesVersion }: SelectStoryListProps) => {
    const styles = useMakeStyles(makeStyles);

    const renderItem = useCallback(
      ({ item }: ListRenderItemInfo<StorySchema>) => {
        const isImageLoaded = !!item.medium_cover_cached_name;
        const previewURL = getImageFilePathForStory(item, 'small');

        return (
          <SelectStoryCell
            isFree={item.is_free}
            isSelected={selectedStoryId === item.id}
            previewURL={isImageLoaded ? previewURL : undefined}
            storyId={item.id}
            title={item.name}
            onPress={onStorySelect}
          />
        );
      },
      [onStorySelect, selectedStoryId],
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
        testID={TEST_ID_SELECT_STORY_LIST}
      />
    );
  },
);

SelectStoryList.displayName = 'SelectStoryList';
