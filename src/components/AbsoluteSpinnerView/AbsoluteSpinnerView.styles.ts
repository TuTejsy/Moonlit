import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    androidBackground: {
      backgroundColor: colors.opacityBlack(0.5),
    },
    spinnerContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      zIndex: zIndex.backgroundLoader,
    },
  });
