import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

import { BUTTON_BOTTOM_PADDING, BUTTON_HEIGHT } from './VoiceSettingsButton.constants';

interface Context {
  storyColor: string;
}

export const makeStyles = (
  { colors, fonts, insets, zIndex }: MakeStylesProps,
  { storyColor }: Context,
) =>
  StyleSheet.create({
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
      backgroundColor: convertHEXtoRGBA(storyColor, 0.7),
      borderRadius: 16,
      flexDirection: 'row',
      height: BUTTON_HEIGHT,
      paddingLeft: 12,
      width: '100%',
    },
    voiceSettingsButtonContainer: {
      bottom: insets.bottom + BUTTON_BOTTOM_PADDING,
      position: 'absolute',
      width: WINDOW_WIDTH - HORIZONTAL_PADDING * 2,
    },
  });
