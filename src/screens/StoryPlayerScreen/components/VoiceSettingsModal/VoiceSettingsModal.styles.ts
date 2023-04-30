import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { MODAL_BOTTOM_PADDING, MODAL_COLLAPSED_HEIGHT } from './VoiceSettingsModal.constants';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    closeIconStyle: {
      position: 'absolute',
      right: 16,
      top: 12,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      height: MODAL_COLLAPSED_HEIGHT,
      justifyContent: 'center',
    },
    modal: {
      backgroundColor: colors.opacityBlack(0.3),
      borderRadius: 24,
      bottom: insets.bottom + MODAL_BOTTOM_PADDING,
      left: 16,
      position: 'absolute',
      width: WINDOW_WIDTH - 32,
      zIndex: 12,
    },
    overlay: {
      backgroundColor: colors.black,
      height: SCREEN_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: SCREEN_WIDTH,
      zIndex: 11,
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      flex: 1,
      marginHorizontal: 16,
      maxHeight: 1,
    },
    text: {
      ...fonts.size_16,
      marginRight: 12,
    },
  });
