import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderBottomColor: colors.opacityGrey(0.5),
      borderBottomWidth: 1,
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 20,
    },
    title: {
      ...fonts.size_14,
      color: colors.white,
      flex: 1,
      marginRight: 16,
    },
    value: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.8),
      flex: 1,
    },
  });
