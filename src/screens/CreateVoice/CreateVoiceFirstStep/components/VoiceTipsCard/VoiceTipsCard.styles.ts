import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    tipDot: {
      backgroundColor: colors.purpleTipDot,
      borderRadius: 5,
      height: 5,
      marginTop: 6,
      width: 5,
    },
    tipRow: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: 8,
      marginBottom: 6,
    },
    tipRowLast: {
      marginBottom: 0,
    },
    tipText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.7),
      flex: 1,
      lineHeight: 18,
    },
    tipsCard: {
      backgroundColor: colors.opacityWhite(0.08),
      borderRadius: 12,
      marginHorizontal: horizontalPadding,
      padding: 16,
    },
  });
