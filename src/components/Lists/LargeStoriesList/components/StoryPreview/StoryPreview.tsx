import React, { useCallback } from 'react';
import { ImageBackground } from 'react-native';

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

  const { handleImageLoad, isImageLoaded } = useImageLoaded();

  const navigation = useNavigation<NavigationType>();

  const handlePreviewPress = useCallback(() => {
    navigation.navigate(RootRoutes.STORY_PLAYER, {
      storyId,
    });
  }, [navigation, storyId]);

  return (
    <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
      {!isImageLoaded && (
        <LinearGradient
          angle={180}
          colors={[colors.opacityBlack(0), colors.opacityBlack(1)]}
          locations={[0, 1]}
          pointerEvents='none'
          style={styles.imageGradient}
        />
      )}

      <ImageBackground
        defaultSource={loonImage}
        resizeMode={isImageLoaded ? 'cover' : 'center'}
        source={{ uri: previewURL }}
        style={styles.preview}
        onLoad={handleImageLoad}
      >
        {isImageLoaded && (
          <LinearGradient
            angle={180}
            colors={[colors.opacityBlack(0), colors.opacityBlack(0.8)]}
            locations={[0, 1]}
            pointerEvents='none'
            style={styles.previewGradient}
          />
        )}

        {!isFree && <Icons.Lock style={styles.lockIcon} />}

        <TextView style={styles.titleText}>{title}</TextView>
        <TextView style={styles.descriptionText}>{description}</TextView>
      </ImageBackground>
    </PressableView>
  );
}

export default React.memo(StoryPreview);
