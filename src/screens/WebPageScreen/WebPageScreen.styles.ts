import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts, insets }: MakeStylesProps) =>
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
