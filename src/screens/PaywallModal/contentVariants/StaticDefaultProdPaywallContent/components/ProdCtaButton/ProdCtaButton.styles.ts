import { StyleSheet } from 'react-native';

import type { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    arrowContainer: {
      position: 'absolute',
      right: dw(20),
    },
    bleedLayer: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    container: {
      borderRadius: 32,
      minHeight: dh(56),
      overflow: 'hidden',
    },
    disabled: {
      opacity: 0.5,
    },
    inner: {
      alignItems: 'center',
      borderRadius: 32,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: dh(56),
      overflow: 'hidden',
    },
    label: {
      ...fonts.size_16,
      color: colors.white,
      fontWeight: '600',
    },
  });
