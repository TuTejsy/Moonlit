import { StyleSheet } from 'react-native';

import type { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    checkIndicator: {
      alignItems: 'center',
      borderRadius: 13,
      borderWidth: 1.5,
      height: 26,
      justifyContent: 'center',
      width: 26,
    },
    container: {
      borderRadius: 16,
      borderWidth: 1,
      marginBottom: dh(6),
      overflow: 'hidden',
      paddingHorizontal: dw(15),
      paddingVertical: dh(10),
    },
    divider: {
      backgroundColor: colors.opacityWhite(0.2),
      height: 1,
      marginVertical: dh(10),
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: dw(12),
    },
    strip: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: dw(8),
    },
    stripDaysFree: {
      ...fonts.size_11,
      color: colors.pink,
      letterSpacing: 0.7,
      textTransform: 'uppercase',
    },
    stripDot: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    stripDueToday: {
      ...fonts.size_12,
      color: colors.white,
      fontWeight: '600',
    },
    stripInner: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    stripWrapper: {
      overflow: 'hidden',
    },
    subtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    textColumn: {
      flex: 1,
      gap: 2,
    },
    title: {
      ...fonts.size_14,
      color: colors.white,
      fontWeight: '700',
    },
  });
