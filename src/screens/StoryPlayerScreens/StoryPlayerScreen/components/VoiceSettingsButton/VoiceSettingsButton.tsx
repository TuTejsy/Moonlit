import React, { useMemo } from 'react';
import { View, Image } from 'react-native';

import { BlurView } from '@sbaiahmed1/react-native-blur';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { IS_IOS } from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useVoicePreviewCachedPath } from '@/hooks/useVoicePreviewCachedPath';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

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
  const { localize } = useAppLocalization();

  const storyPlayerScreenLayout = useStoryPlayerScreenLayout();

  const styles = useMakeStyles(makeStyles, storyPlayerScreenLayout);
  const { colors } = useTheme();

  const voicePreviewCachedPath = useVoicePreviewCachedPath(voiceCoverUrl);

  return (
    <View style={styles.voiceSettingsButtonContainer}>
      <View style={styles.blurViewContainer}>
        {IS_IOS && (
          <BlurView
            blurAmount={15}
            blurType='light'
            overlayColor={IS_IOS ? convertHEXtoRGBA(storyColor, 0.3) : storyColor}
            reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
            style={styles.blurView}
          />
        )}
      </View>

      <PressableView style={styles.voiceSettingsButton} onPress={onPress}>
        <Icons.Waveframe />

        <View style={styles.titleContainer}>
          <TextView style={styles.title} type='bold'>
            {localize('common', 'selectVoice')}
          </TextView>

          <TextView style={styles.subTitle} type='regular'>
            {voiceName} {localize('common', 'voice')}
          </TextView>
        </View>

        <Image source={{ uri: voicePreviewCachedPath }} style={styles.voiceAvatar} />
      </PressableView>
    </View>
  );
}
