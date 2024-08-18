import { StyleSheet } from 'react-native';

import { WINDOW_MAX_WIDTH, WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: WINDOW_WIDTH,
    },
    promotionContainer: {
      marginLeft: -HORIZONTAL_PADDING,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingVertical: 21,
      width: '100%',
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      width: '100%',
    },
    stories: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    storiesSeparator: {
      height: 34,
    },
    unlockButton: {
      alignSelf: 'center',
      marginBottom: 24,
      marginTop: 24,
      width: WINDOW_MAX_WIDTH,
    },
  });
