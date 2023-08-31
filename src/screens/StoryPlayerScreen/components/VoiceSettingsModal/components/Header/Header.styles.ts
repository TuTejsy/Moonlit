import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { MODAL_COLLAPSED_HEIGHT } from '../../VoiceSettingsModal.constants';

export const makeStyles = ({ fonts, insets }: MakeStylesProps) =>
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
    text: {
      ...fonts.size_16,
      marginRight: 12,
    },
  });
