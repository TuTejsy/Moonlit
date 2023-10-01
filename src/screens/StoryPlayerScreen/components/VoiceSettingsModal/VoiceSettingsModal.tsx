import React, { useCallback, useMemo } from 'react';

import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREEN_HEIGHT } from '@/constants/layout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

import Header from './components/Header/Header';
import { MODAL_BOTTOM_PADDING, MODAL_COLLAPSED_HEIGHT } from './VoiceSettingsModal.constants';
import { makeStyles } from './VoiceSettingsModal.styles';
import { NavigationType } from './VoiceSettingsModal.types';

interface VoiceSettingsModalProps {
  storyColor: string;
  storyId: number;
}

function VoiceSettingsModal({ storyColor, storyId }: VoiceSettingsModalProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const stylesContext = useMemo(() => ({ storyColor }), [storyColor]);

  const styles = useMakeStyles(makeStyles, stylesContext);

  const navigation = useNavigation<NavigationType>();

  const isModalExpandedSharedValue = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      isModalExpandedSharedValue.value,
      [0, 1],
      [MODAL_COLLAPSED_HEIGHT, SCREEN_HEIGHT],
    ),

    paddingTop: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, insets.top]),
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 1 ? 'flex' : 'none',
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 0 ? 'none' : 'flex',
    paddingHorizontal: interpolate(isModalExpandedSharedValue.value, [0, 1], [16, 0]),
  }));

  const [buttonColor, modalColor] = useMemo(
    () => [convertHEXtoRGBA(storyColor, 1), convertHEXtoRGBA(storyColor, 0)],
    [storyColor],
  );

  const modalContainerBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isModalExpandedSharedValue.value,
      [0, 1],
      [buttonColor, modalColor],
      'RGB',
    ),
  }));

  const modalContainerAnimatedStyle = useAnimatedStyle(() => ({
    bottom: interpolate(
      isModalExpandedSharedValue.value,
      [0, 1],
      [insets.bottom + MODAL_BOTTOM_PADDING, 0],
    ),
    paddingHorizontal: interpolate(isModalExpandedSharedValue.value, [0, 1], [16, 0]),
  }));

  const handleOverlayTouchEnd = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  return (
    <>
      <Animated.View
        style={[styles.overlay, overlayAnimatedStyle]}
        onTouchEnd={handleOverlayTouchEnd}
      />
      <Animated.View style={[styles.modalContainer, modalContainerAnimatedStyle]}>
        <Animated.View
          style={[styles.modalContainerBackground, modalContainerBackgroundAnimatedStyle]}
        >
          <BlurView
            blurAmount={5}
            blurType='dark'
            reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
            style={styles.modal}
          >
            <Animated.View style={modalAnimatedStyle}>
              <Header isModalExpandedSharedValue={isModalExpandedSharedValue} />

              <Animated.View style={[styles.content, animatedContentStyle]} />
            </Animated.View>
          </BlurView>
        </Animated.View>
      </Animated.View>
    </>
  );
}

export default VoiceSettingsModal;
