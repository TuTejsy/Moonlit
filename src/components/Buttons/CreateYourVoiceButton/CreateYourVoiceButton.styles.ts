import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: 32,
      height: 32,
      justifyContent: 'center',
      width: 142,
    },
    buttonText: {
      ...fonts.size_12,
      color: colors.white,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: 16,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      padding: 16,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      width: 40,
    },
    leftContent: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    textHeadline: {
      ...fonts.size_12_16,
      color: colors.white,
    },
  });
