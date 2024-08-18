import { StyleSheet } from 'react-native';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SUFFICIENT_WINDOW_WIDTH,
  WINDOW_MAX_WIDTH,
} from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    addVoiceText: {
      ...fonts.size_14,
      color: colors.opacityBlack(0.7),
    },
    audioRecordingsList: {
      flex: 1,
    },
    audioRecordingsListContainer: {
      alignItems: 'center',
      paddingHorizontal: HORIZONTAL_PADDING - dw(7.5),
      paddingTop: 10,
    },
    blurView: {
      height: SCREEN_HEIGHT,
      left: 0,
      position: 'absolute',
      width: SCREEN_WIDTH,
    },
    bottomBar: {
      height: 64,
      marginBottom: insets.bottom,
      width: SCREEN_WIDTH,
    },
    bottomBarContent: {
      alignItems: 'center',
      marginTop: 26,
    },
    bottomText: {
      ...fonts.size_16,
    },
    gradient: {
      bottom: 0,
      height: dh(306),
      left: 0,
      position: 'absolute',
      width: '100%',
    },
    modalContainer: {
      flex: 1,
    },
    unlockButton: {
      alignSelf: 'center',
      marginBottom: insets.bottom + 17,
      marginHorizontal: HORIZONTAL_PADDING,
      width: SUFFICIENT_WINDOW_WIDTH - HORIZONTAL_PADDING * 2,
    },
  });
