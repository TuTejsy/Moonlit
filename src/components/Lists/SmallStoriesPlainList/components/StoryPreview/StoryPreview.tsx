import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useHandleStoryPlayerNavigate } from '@/hooks/navigation/useHandleStoryPlayerNavigate';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { makeStyles } from './StoryPreview.styles';

interface StoryPreviewPropTypes {
  description: string;
  isFree: boolean;
  previewURL: string | undefined;
  storyId: number;
  title: string;
  isSaved?: boolean;
  onSaveStoryPress?: (storyId: number) => void;
  showSaveButton?: boolean;
}

export const StoryPreview = React.memo(
  ({
    description,
    isFree,
    isSaved,
    onSaveStoryPress,
    previewURL,
    showSaveButton,
    storyId,
    title,
  }: StoryPreviewPropTypes) => {
    const styles = useMakeStyles(makeStyles);

    const isFullVersion = useAppSelector(selectIsFullVersion);

    const handlePreviewPress = useHandleStoryPlayerNavigate({ isFree, storyId });

    const handleStoryFavoritePress = useCallback(() => {
      onSaveStoryPress?.(storyId);
    }, [onSaveStoryPress, storyId]);

    return (
      <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: previewURL }} style={styles.preview} />
          {!isFree && !isFullVersion && <Icons.Lock style={styles.lockIcon} />}
        </View>
        <View style={styles.content}>
          <TextView numberOfLines={1} style={styles.titleText} type='bold'>
            {title}
          </TextView>
          <TextView numberOfLines={1} style={styles.descriptionText}>
            {description}
          </TextView>
        </View>

        {showSaveButton && (
          <PressableView style={styles.button} onPress={handleStoryFavoritePress}>
            <Icons.Favorite height={20} isFavorite={isSaved ?? false} width={20} />
          </PressableView>
        )}
      </PressableView>
    );
  },
);
