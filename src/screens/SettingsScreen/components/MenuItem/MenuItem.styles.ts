import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: dh(8),
      flexDirection: 'row',
      marginVertical: dh(8),
      padding: 16,
    },
    title: {
      ...fonts.size_16,
      color: colors.white,
      marginLeft: 16,
    },
  });
