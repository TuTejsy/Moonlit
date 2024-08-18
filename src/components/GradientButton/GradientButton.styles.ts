import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dw,
  fonts,
  horizontalPadding,
  sufficientWindowWidth,
  windowMaxWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    buttonGradient: {
      alignItems: 'center',
      borderRadius: dw(32, windowMaxWidth),
      height: dw(48, windowMaxWidth),
      justifyContent: 'center',
      width: '100%',
    },
    buttonText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });
