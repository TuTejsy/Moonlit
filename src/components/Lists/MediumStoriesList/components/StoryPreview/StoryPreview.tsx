import React, { useCallback } from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import loonImage from '@/assets/images/moon/moon.png';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useImageLoaded } from '@/hooks/useImageLoaded';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { makeStyles } from './StoryPreview.styles';
import { NavigationType } from './StoryPreview.types';

interface StoryPreviewPropTypes {
  description: string;
  isFree: boolean;
  previewURL: string;
  storyId: number;
  title: string;
}

function StoryPreview({ description, isFree, previewURL, storyId, title }: StoryPreviewPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const navigation = useNavigation<NavigationType>();

  const { handleImageLoad, isImageLoaded } = useImageLoaded();

  const handlePreviewPress = useCallback(() => {
    navigation.navigate(RootRoutes.STORY_PLAYER, {
      storyId,
    });
  }, [navigation, storyId]);

  return (
    <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
      <LinearGradient
        angle={180}
        colors={[colors.opacityBlack(0), colors.opacityBlack(0.7)]}
        locations={[0, 1]}
        pointerEvents='none'
        style={styles.previewGradient}
      />

      <Image
        defaultSource={loonImage}
        resizeMode={isImageLoaded ? 'cover' : 'center'}
        source={{ uri: previewURL }}
        style={styles.preview}
        onLoad={handleImageLoad}
      />

      {!isFree && <Icons.Lock style={styles.lockIcon} />}

      <TextView numberOfLines={1} style={styles.titleText}>
        {title}
      </TextView>
      <TextView numberOfLines={2} style={styles.descriptionText}>
        {description}
      </TextView>
    </PressableView>
  );
}

export default StoryPreview;
