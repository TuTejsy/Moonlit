import React, { useMemo } from 'react';
import { View, Image } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { IS_IOS } from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useVoicePreviewCachedPath } from '@/hooks/useVoicePreviewCachedPath';

import { useStoryPlayerScreenLayout } from '../../hooks/useStoryPlayerScreenLayout';

import { makeStyles } from './VoiceSettingsButton.styles';

interface VoiceSettingsButtonProps {
  onPress: () => void;
  storyColor: string;
  voiceCoverUrl: string;
  voiceName: string;
}

export function VoiceSettingsButton({
  onPress,
  storyColor,
  voiceCoverUrl,
  voiceName,
}: VoiceSettingsButtonProps) {
  const storyPlayerScreenLayout = useStoryPlayerScreenLayout();

  const stylesContext = useMemo(
    () => ({
      storyColor,
      ...storyPlayerScreenLayout,
    }),
    [storyColor, storyPlayerScreenLayout],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);
  const { colors } = useTheme();

  const voicePreviewCachedPath = useVoicePreviewCachedPath(voiceCoverUrl);

  return (
    <View style={styles.voiceSettingsButtonContainer}>
      <View style={styles.blurViewContainer}>
        {IS_IOS && (
          <BlurView
            blurAmount={5}
            blurType='light'
            reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
            style={styles.blurView}
          />
        )}
      </View>

      <PressableView style={styles.voiceSettingsButton} onPress={onPress}>
        <Icons.Waveframe />

        <View style={styles.titleContainer}>
          <TextView style={styles.title} type='bold'>
            Select voice
          </TextView>

          <TextView style={styles.subTitle} type='regular'>
            {voiceName} Voice
          </TextView>
        </View>

        <Image source={{ uri: voicePreviewCachedPath }} style={styles.voiceAvatar} />
      </PressableView>
    </View>
  );
}
