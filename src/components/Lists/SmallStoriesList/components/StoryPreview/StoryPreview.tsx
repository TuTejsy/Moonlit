import React, { memo } from 'react';
import { Image, View } from 'react-native';

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
import { usePreviewLayout } from './hooks/usePreviewLayout';

interface StoryPreviewPropTypes {
  description: string;
  isComingSoon: boolean;
  isFree: boolean;
  isImageLoaded: boolean;
  previewURL: string | undefined;
  source: SOURCE;
  storyId: number;
  title: string;
  tab?: TabEventType;
}

export const StoryPreview = memo(
  ({
    description,
    isComingSoon,
    isFree,
    isImageLoaded,
    previewURL,
    source,
    storyId,
    tab,
    title,
  }: StoryPreviewPropTypes) => {
    const previewLayout = usePreviewLayout();
    const styles = useMakeStyles(makeStyles, previewLayout);

    const isFullVersion = useAppSelector(selectIsFullVersion);

    const handlePreviewPress = useHandleStoryPlayerNavigate({
      contentName: title,
      isFree,
      source,
      storyId,
      tab,
    });

    return (
      <TouchableWithoutFeedback
        disabled={isComingSoon}
        style={styles.previewContainer}
        onPress={handlePreviewPress}
      >
        <View style={styles.previewImageContainer}>
          <Image
            blurRadius={isComingSoon ? 5 : undefined}
            defaultSource={loonImage}
            resizeMode={isImageLoaded ? 'cover' : 'center'}
            source={{ uri: previewURL }}
            style={styles.preview}
          />

          {isComingSoon && (
            <>
              <View style={styles.comingSoonOverlay} />
              <View style={styles.comingSoonLabel}>
                <TextView style={styles.comingSoonText}>Coming Soon</TextView>
              </View>
            </>
          )}
        </View>

        {!isFree && !isFullVersion && <Icons.Lock style={styles.lockIcon} />}

        <TextView numberOfLines={1} style={styles.titleText} type='bold'>
          {title}
        </TextView>
        <TextView numberOfLines={2} style={styles.descriptionText}>
          {description}
        </TextView>
      </TouchableWithoutFeedback>
    );
  },
);
