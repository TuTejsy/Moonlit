import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { MODAL_COLLAPSED_HEIGHT } from '../../VoiceSettingsModal.constants';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    buttonHeaderContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: MODAL_COLLAPSED_HEIGHT,
    },
    buttonTitleContainer: {
      marginHorizontal: 12,
    },
    closeIcon: {
      left: 16,
      position: 'absolute',
    },
    header: {
      paddingLeft: 12,
    },
    modalHeaderContainer: {
      left: 0,
      position: 'absolute',
      top: 0,
    },
    modalTitleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: DEFAULT_HEADER_HEIGHT,
      justifyContent: 'center',
      position: 'relative',
      width: WINDOW_WIDTH,
    },
    subTitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    title: {
      ...fonts.size_16,
      color: colors.white,
    },
  });
