import React, { useCallback } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { makeStyles } from './StoryPreview.styles';
import { NavigationType } from './StoryPreview.types';

interface StoryPreviewPropTypes {
  previewURL: string;
  storyId: number;
  title: string;
}

function StoryPreview({ previewURL, storyId, title }: StoryPreviewPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const navigation = useNavigation<NavigationType>();

  const handlePreviewPress = useCallback(() => {
    navigation.navigate(RootRoutes.STORY_PLAYER, {
      storyId,
    });
  }, [navigation, storyId]);

  return (
    <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
      <Image source={{ uri: previewURL }} style={styles.preview} />

      <TextView style={styles.titleText}>{title}</TextView>
      <TextView style={styles.descriptionText}>Description</TextView>
    </PressableView>
  );
}

export default StoryPreview;
