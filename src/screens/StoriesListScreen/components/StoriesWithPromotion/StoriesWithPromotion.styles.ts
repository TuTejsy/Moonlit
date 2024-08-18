import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  horizontalPadding,
  sufficientWindowWidth,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: windowWidth,
    },
    promotionContainer: {
      marginLeft: -horizontalPadding,
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
      marginLeft: -horizontalPadding,
      width: '100%',
    },
    storiesSeparator: {
      height: 34,
    },
    unlockButton: {
      alignSelf: 'center',
      marginBottom: 24,
      marginTop: 24,
      width: sufficientWindowWidth - horizontalPadding * 2,
    },
  });
