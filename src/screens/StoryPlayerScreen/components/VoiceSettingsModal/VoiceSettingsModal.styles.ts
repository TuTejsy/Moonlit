import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, insets, zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    addVoiceText: {
      ...fonts.size_14,
      color: colors.opacityBlack(0.7),
    },
    audioRecordingsList: {
      flex: 1,
    },
    audioRecordingsListContainer: {
      paddingHorizontal: HORIZONTAL_PADDING - dw(7.5),
      paddingTop: 10,
    },
    blurView: {
      height: SCREEN_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
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
      height: SCREEN_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: SCREEN_WIDTH,
      zIndex: zIndex.max,
    },
    unlockButton: {
      marginBottom: insets.bottom + 17,
      marginHorizontal: HORIZONTAL_PADDING,
    },
  });
