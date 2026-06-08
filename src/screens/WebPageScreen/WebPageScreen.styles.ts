import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.darkPurple,
      flex: 1,
      paddingBottom: insets.bottom,
      paddingTop: insets.top,
    },
    webView: {
      backgroundColor: colors.darkPurple,
      flex: 1,
    },
  });
