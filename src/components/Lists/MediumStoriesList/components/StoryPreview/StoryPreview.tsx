import React from 'react';
import { Image } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Icons } from '@/assets/icons/Icons';
import loonImage from '@/assets/images/moon/moon.png';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useHandleStoryPlayerNavigate } from '@/hooks/navigation/useHandleStoryPlayerNavigate';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
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
      <Image
        blurRadius={!isImageLoaded ? 10 : 0}
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
