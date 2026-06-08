import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  maxHeight: number;
}

export const makeStyles = (_props: MakeStylesProps, { maxHeight }: Context) =>
  StyleSheet.create({
    voiceWaveform: {
      alignItems: 'center',
      flexDirection: 'row',
      height: maxHeight,
      justifyContent: 'center',
    },
  });
