import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: 8,
      flexDirection: 'row',
      marginVertical: 8,
      padding: 16,
    },
    title: {
      ...fonts.size_16,
      color: colors.white,
      marginLeft: 16,
    },
  });
