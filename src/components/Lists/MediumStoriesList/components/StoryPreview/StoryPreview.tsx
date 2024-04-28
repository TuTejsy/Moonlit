import React from 'react';
import { Image } from 'react-native';

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
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { makeStyles } from './StoryPreview.styles';

interface StoryPreviewPropTypes {
  description: string;
  isFree: boolean;
  isImageLoaded: boolean;
  previewURL: string | undefined;
  source: SOURCE;
  storyId: number;
  title: string;
  tab?: TabEventType;
}

export function StoryPreview({
  description,
  isFree,
  isImageLoaded,
  previewURL,
  source,
  storyId,
  tab,
  title,
}: StoryPreviewPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const isFullVersion = useAppSelector(selectIsFullVersion);

  const handlePreviewPress = useHandleStoryPlayerNavigate({
    contentName: title,
    isFree,
    source,
    storyId,
    tab,
  });

  return (
    <TouchableWithoutFeedback style={styles.previewContainer} onPress={handlePreviewPress}>
      {previewURL && !isImageLoaded ? (
        <BlurView
          blurAmount={5}
          blurRadius={10}
          blurType='dark'
          reducedTransparencyFallbackColor={colors.opacityBlack(0.2)}
          style={styles.blurView}
        />
      ) : (
        <LinearGradient
          useAngle
          angle={180}
          colors={[colors.opacityBlack(0), colors.opacityBlack(0.7)]}
          locations={[0, 1]}
          pointerEvents='none'
          style={styles.previewGradient}
        />
      )}

      <Image
        defaultSource={loonImage}
        resizeMode={previewURL ? 'cover' : 'center'}
        source={{ uri: previewURL }}
        style={styles.preview}
      />

      {!isFree && !isFullVersion && <Icons.Lock style={styles.lockIcon} />}

      <TextView numberOfLines={1} style={styles.titleText}>
        {title}
      </TextView>
      <TextView numberOfLines={2} style={styles.descriptionText}>
        {description}
      </TextView>
    </TouchableWithoutFeedback>
  );
}
