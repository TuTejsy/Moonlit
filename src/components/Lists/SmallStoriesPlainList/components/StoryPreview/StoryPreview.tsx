import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { makeStyles } from './StoryPreview.styles';
import { NavigationType } from './StoryPreview.types';

interface StoryPreviewPropTypes {
  description: string;
  isFree: boolean;
  previewURL: string;
  storyId: number;
  title: string;
  isSaved?: boolean;
  onSaveStoryPress?: (storyId: number) => void;
  showSaveButton?: boolean;
}

function StoryPreview({
  description,
  isFree,
  isSaved,
  onSaveStoryPress,
  previewURL,
  showSaveButton,
  storyId,
  title,
}: StoryPreviewPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const navigation = useNavigation<NavigationType>();

  const handlePreviewPress = useCallback(() => {
    navigation.navigate(RootRoutes.STORY_PLAYER, {
      storyId,
    });
  }, [navigation, storyId]);

  const handleStoryFavoritePress = useCallback(() => {
    onSaveStoryPress?.(storyId);
  }, [onSaveStoryPress, storyId]);

  return (
    <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: previewURL }} style={styles.preview} />
        {!isFree && <Icons.Lock style={styles.lockIcon} />}
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
}

export default React.memo(StoryPreview);
