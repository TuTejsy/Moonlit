import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SCREEN_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { MODAL_BOTTOM_PADDING, MODAL_COLLAPSED_HEIGHT } from './VoiceSettingsModal.constants';
import { makeStyles } from './VoiceSettingsModal.styles';

function VoiceSettingsModal() {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const modalExpandedHeight = useMemo(
    () => SCREEN_HEIGHT - insets.bottom - insets.top - DEFAULT_HEADER_HEIGHT - MODAL_BOTTOM_PADDING,
    [insets.bottom, insets.top],
  );

  const isModalExpandedSharedValue = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      isModalExpandedSharedValue.value,
      [0, 1],
      [MODAL_COLLAPSED_HEIGHT, modalExpandedHeight],
    ),
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 0 ? 'none' : 'flex',
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, 0.5]),
  }));

  const closeIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, 1]),
  }));

  const handleHeaderPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(1, {
      easing: Easing.in(Easing.ease),
    });
  }, [isModalExpandedSharedValue]);

  const handleOverlayTouchEnd = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  const handleCloseIconPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  return (
    <>
      <Animated.View
        style={[styles.overlay, overlayAnimatedStyle]}
        onTouchEnd={handleOverlayTouchEnd}
      />
      <BlurView
        blurAmount={10}
        blurType='light'
        reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
        style={styles.modal}
      >
        <Animated.View style={modalAnimatedStyle}>
          <PressableView style={styles.header} onPress={handleHeaderPress}>
            <TextView style={styles.text} type='bold'>
              Voice settings
            </TextView>

            <Icons.Waveframe />

            <Animated.View style={[styles.closeIconStyle, closeIconAnimatedStyle]}>
              <Icons.Close onPress={handleCloseIconPress} />
            </Animated.View>
          </PressableView>

          <View style={styles.separator} />
        </Animated.View>
      </BlurView>
    </>
  );
}

export default VoiceSettingsModal;
