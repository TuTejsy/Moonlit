import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { AuidioRecordingLayout } from './components/AudioRecording/hooks/useAudioRecordingLayout';

export const makeStyles = (
  {
    colors,
    dh,
    fonts,
    horizontalPadding,
    insets,
    sufficientWindowWidth,
    windowHeight,
    windowWidth,
  }: MakeStylesProps,
  { cellSpace }: AuidioRecordingLayout,
) =>
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
      paddingHorizontal: horizontalPadding - cellSpace / 2,
      paddingTop: 10,
    },
    blurView: {
      height: windowHeight,
      left: 0,
      position: 'absolute',
      width: windowWidth,
    },
    bottomBar: {
      height: 64,
      marginBottom: insets.bottom,
      width: windowWidth,
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
      marginHorizontal: horizontalPadding,
      width: sufficientWindowWidth - horizontalPadding * 2,
    },
  });
