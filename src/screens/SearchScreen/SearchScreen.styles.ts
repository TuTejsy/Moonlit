import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.black,
      flex: 1,
      paddingTop: insets.top + 10,
    },
  });
