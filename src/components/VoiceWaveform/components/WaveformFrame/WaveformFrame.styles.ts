import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  color: string;
  maxHeight: number;
  minHeight: number;
  opacity?: number;
}

export const makeStyles = (
  { colors }: MakeStylesProps,
  { color, maxHeight, minHeight, opacity }: Context,
) =>
  StyleSheet.create({
    waveformFrame: {
      backgroundColor: color,
      borderRadius: 8,
      marginHorizontal: 4,
      maxHeight,
      minHeight,
      opacity,
      width: 4,
    },
  });
