import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  fonts,
  horizontalPadding,
  windowWidth,
  windowMaxWidth,
  dw,
}: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      width: windowWidth - horizontalPadding * 2,
      height: dw(56, windowMaxWidth),
      marginTop: dw(24, windowMaxWidth),
      marginHorizontal: horizontalPadding,
    },
    decorationContainer: {
      alignItems: 'center',
      height: 122,
      justifyContent: 'center',
      marginBottom: 12,
      marginTop: 24,
      position: 'relative',
      width: '100%',
    },
    description: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.7),
      marginBottom: 32,
      paddingHorizontal: horizontalPadding,
      textAlign: 'center',
    },

    plumpMoonIcon: {
      position: 'absolute',
      zIndex: 1,
    },
    starsContainer: {
      height: 122,
      position: 'absolute',
      top: 0,
      width: 312,
      zIndex: 0,
    },
    title: {
      ...fonts.size_24,
      marginBottom: 16,
      textAlign: 'center',
    },
  });
