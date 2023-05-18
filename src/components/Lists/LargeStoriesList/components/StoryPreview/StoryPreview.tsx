import React, { useCallback } from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { makeStyles } from './StoryPreview.styles';
import { NavigationType } from './StoryPreview.types';

interface StoryPreviewPropTypes {
  previewURL: string;
  title: string;
}

function StoryPreview({ previewURL, title }: StoryPreviewPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const navigation = useNavigation<NavigationType>();

  console.log(previewURL);

  const handlePreviewPress = useCallback(() => {
    navigation.navigate(RootRoutes.STORY_PLAYER, {
      storyImageSource: { uri: previewURL },
      storyTitle: title,
    });
  }, [navigation, previewURL, title]);

  return (
    <PressableView style={styles.previewContainer} onPress={handlePreviewPress}>
      <ImageBackground source={{ uri: previewURL }} style={styles.preview}>
        <LinearGradient
          angle={180}
          colors={[colors.opacityBlack(0), colors.opacityBlack(0.8)]}
          locations={[0.4, 1]}
          pointerEvents='none'
          style={styles.previewGradient}
        />
        <TextView style={styles.titleText}>{title}</TextView>
        <TextView style={styles.descriptionText}>Description</TextView>
      </ImageBackground>
    </PressableView>
  );
}

export default StoryPreview;
