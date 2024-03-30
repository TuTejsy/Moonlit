import React from 'react';
import { ImageBackground } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import loonImage from '@/assets/images/moon/moon.png';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useHandleStoryPlayerNavigate } from '@/hooks/navigation/useHandleStoryPlayerNavigate';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { makeStyles } from './StoryPreview.styles';

interface StoryPreviewPropTypes {
  description: string;
  isFree: boolean;
  isImageLoaded: boolean;
  previewURL: string | undefined;
  storyId: number;
  title: string;
}

export const StoryPreview = React.memo(
  ({ description, isFree, isImageLoaded, previewURL, storyId, title }: StoryPreviewPropTypes) => {
    const styles = useMakeStyles(makeStyles);
    const { colors } = useTheme();

    const isFullVersion = useAppSelector(selectIsFullVersion);

    const handlePreviewPress = useHandleStoryPlayerNavigate({ isFree, storyId });

    return (
      <TouchableWithoutFeedback style={styles.previewContainer} onPress={handlePreviewPress}>
        {!isImageLoaded &&
          (previewURL ? (
            <BlurView
              blurAmount={5}
              blurRadius={10}
              blurType='dark'
              reducedTransparencyFallbackColor={colors.opacityBlack(0.2)}
              style={styles.blurView}
            />
          ) : (
            <LinearGradient
              angle={180}
              colors={[colors.opacityBlack(0), colors.opacityBlack(1)]}
              locations={[0, 1]}
              pointerEvents='none'
              style={styles.imageGradient}
            />
          ))}

        <ImageBackground
          defaultSource={loonImage}
          imageStyle={!isImageLoaded && !previewURL && styles.emptyImageStyle}
          resizeMode={previewURL ? 'cover' : 'center'}
          source={{ uri: previewURL }}
          style={styles.preview}
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

          {!isFree && !isFullVersion && <Icons.Lock style={styles.lockIcon} />}

          <TextView style={styles.titleText}>{title}</TextView>
          <TextView numberOfLines={2} style={styles.descriptionText}>
            {description}
          </TextView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  },
);
