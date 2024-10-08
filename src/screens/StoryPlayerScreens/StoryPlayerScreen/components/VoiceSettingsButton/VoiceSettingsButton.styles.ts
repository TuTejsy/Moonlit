import { StyleSheet } from 'react-native';

import { IS_IOS } from '@/constants/common';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

import { StoryPlayerScreenLayout } from '../../hooks/useStoryPlayerScreenLayout';

import { BUTTON_BOTTOM_PADDING, BUTTON_HEIGHT } from './VoiceSettingsButton.constants';

interface Context extends StoryPlayerScreenLayout {
  storyColor: string;
}

export const makeStyles = (
  { colors, fonts, insets }: MakeStylesProps,
  { storyColor, storyContainerMinWidth }: Context,
) =>
  StyleSheet.create({
    blurView: {
      flex: 1,
    },
    blurViewContainer: {
      backgroundColor: IS_IOS ? convertHEXtoRGBA(storyColor, 0.3) : storyColor,
      borderRadius: 16,
      height: BUTTON_HEIGHT,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    subTitle: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.5),
    },
    title: {
      ...fonts.size_14,
      color: colors.white,
    },
    titleContainer: {
      marginHorizontal: 12,
    },
    voiceAvatar: {
      bottom: 0,
      height: 94,
      position: 'absolute',
      right: 0,
      width: 81,
    },
    voiceSettingsButton: {
      alignItems: 'center',
      borderRadius: 16,
      flexDirection: 'row',
      height: BUTTON_HEIGHT,
      paddingLeft: 12,
      position: 'relative',
      width: '100%',
    },
    voiceSettingsButtonContainer: {
      bottom: insets.bottom + BUTTON_BOTTOM_PADDING,
      position: 'absolute',
      width: storyContainerMinWidth,
    },
  });
