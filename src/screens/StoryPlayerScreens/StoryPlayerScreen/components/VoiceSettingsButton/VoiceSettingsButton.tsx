import React, { useMemo } from 'react';
import { View, Image } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

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
  const stylesContext = useMemo(
    () => ({
      storyColor,
    }),
    [storyColor],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);
  const { colors } = useTheme();

  return (
    <View style={styles.voiceSettingsButtonContainer}>
      <BlurView
        blurAmount={5}
        blurType='light'
        reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
        style={styles.blurView}
      />

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

        <Image source={{ cache: 'force-cache', uri: voiceCoverUrl }} style={styles.voiceAvatar} />
      </PressableView>
    </View>
  );
}
