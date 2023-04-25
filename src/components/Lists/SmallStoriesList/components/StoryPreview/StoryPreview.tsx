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
  imageSource: ImageSourcePropType;
  title: string;
}

function StoryPreview({ imageSource, title }: StoryPreviewPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const navigation = useNavigation<NavigationType>();

  const handlePreviewPress = useCallback(() => {
    navigation.navigate(RootRoutes.STORY_PLAYER, {
      storyImageSource: imageSource,
      storyTitle: title,
    });
  }, [imageSource, navigation, title]);

  return (
    <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
      <Image source={imageSource} style={styles.preview} />

      <TextView bold style={styles.titleText}>
        {title}
      </TextView>
      <TextView style={styles.descriptionText}>Description</TextView>
    </PressableView>
  );
}

export default StoryPreview;
