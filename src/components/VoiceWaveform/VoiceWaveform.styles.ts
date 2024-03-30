import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  maxHeight: number;
}

export const makeStyles = ({ colors }: MakeStylesProps, { maxHeight }: Context) =>
  StyleSheet.create({
    voiceWaveform: {
      alignItems: 'center',
      flexDirection: 'row',
      height: maxHeight,
      justifyItems: 'center',
    },
  });
