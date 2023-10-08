import React, { useCallback, useMemo } from 'react';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import Header from './components/Header/Header';
import VoiceSettingsButton from './components/VoiceSettingsButton/VoiceSettingsButton';
import { makeStyles } from './VoiceSettingsModal.styles';

interface VoiceSettingsModalProps {
  storyColor: string;
  storyId: number;
}

function VoiceSettingsModal({ storyColor, storyId }: VoiceSettingsModalProps) {
  const { colors } = useTheme();

  const stylesContext = useMemo(() => ({ storyColor }), [storyColor]);

  const styles = useMakeStyles(makeStyles, stylesContext);

  const isModalExpandedSharedValue = useSharedValue(0);

  const modalContainerAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 0 ? 'none' : 'flex',
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, 1]),
  }));

  const handleCloseIconPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  return (
    <>
      <Animated.View style={[styles.modalContainer, modalContainerAnimatedStyle]}>
        <BlurView
          blurAmount={5}
          blurType='dark'
          reducedTransparencyFallbackColor={colors.opacityBlack(0.6)}
          style={styles.modal}
        >
          <Header onCloseIconPress={handleCloseIconPress} />
        </BlurView>
      </Animated.View>

      <VoiceSettingsButton
        isModalExpandedSharedValue={isModalExpandedSharedValue}
        storyColor={storyColor}
      />
    </>
  );
}

export default VoiceSettingsModal;
