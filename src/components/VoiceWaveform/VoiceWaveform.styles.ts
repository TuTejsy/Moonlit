import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  gap: number;
  maxHeight: number;
}

export const makeStyles = ({ colors }: MakeStylesProps, { gap, maxHeight }: Context) =>
  StyleSheet.create({
    voiceWaveform: {
      alignItems: 'center',
      flexDirection: 'row',
      gap,
      height: maxHeight,
      justifyContent: 'center',
    },
  });
