import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  fonts,
  insets,
  horizontalPadding,
  windowWidth,
  windowMaxWidth,
  dw,
}: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      height: dw(56, windowMaxWidth),
      position: 'absolute',
      bottom: insets.bottom + 18,
      left: horizontalPadding,
      width: windowWidth - horizontalPadding * 2,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: horizontalPadding,
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
      marginTop: 16,
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
      textAlign: 'center',
    },
  });
