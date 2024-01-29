import React, { useCallback, useMemo } from 'react';
import { View, Image } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './VoiceSettingsButton.styles';

interface VoiceSettingsButtonProps {
  isModalExpandedSharedValue: SharedValue<number>;
  storyColor: string;
  voiceCoverUrl: string;
  voiceName: string;
}

export function VoiceSettingsButton({
  isModalExpandedSharedValue,
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

  const voiceSettingsButtonContainerAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 1 ? 'none' : 'flex',
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [1, 0]),
  }));

  const handleVoiceSettingsButtonPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(1, {
      easing: Easing.in(Easing.ease),
    });
  }, [isModalExpandedSharedValue]);

  return (
    <Animated.View
      style={[styles.voiceSettingsButtonContainer, voiceSettingsButtonContainerAnimatedStyle]}
    >
      <BlurView
        blurAmount={5}
        blurType='light'
        reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
        style={styles.blurView}
      />

      <PressableView style={styles.voiceSettingsButton} onPress={handleVoiceSettingsButtonPress}>
        <Icons.Waveframe />

        <View style={styles.titleContainer}>
          <TextView style={styles.title} type='bold'>
            Select voice
          </TextView>

          <TextView style={styles.subTitle} type='regular'>
            {voiceName} Voice
          </TextView>
        </View>

        <Image source={{ uri: voiceCoverUrl }} style={styles.voiceAvatar} />
      </PressableView>
    </Animated.View>
  );
}
