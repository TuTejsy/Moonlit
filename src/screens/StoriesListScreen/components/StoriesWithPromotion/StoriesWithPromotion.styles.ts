import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    promotionContainer: {
      flex: 1,
      marginLeft: -HORIZONTAL_PADDING,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingVertical: 21,
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      width: '100%',
    },
    stories: {
      flex: 1,
      flexDirection: 'row',
    },
    storiesSeparator: {
      height: 34,
    },
    unlockButton: {
      marginBottom: 24,
      marginTop: 24,
    },
  });
