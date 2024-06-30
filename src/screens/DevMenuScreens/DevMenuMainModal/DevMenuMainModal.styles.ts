import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      marginTop: 30,
    },
    header: {
      backgroundColor: colors.darkPurple,
    },
    screen: {
      flex: 1,
    },
    scrollView: {},
    scrollViewContent: {
      paddingBottom: insets.bottom + 20,
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    title: {
      ...fonts.size_18,
      borderBottomColor: colors.green,
      borderBottomWidth: 1,
      marginBottom: 10,
      marginTop: 30,
    },
  });
