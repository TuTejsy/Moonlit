import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    spinnerContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      zIndex: zIndex.backgroundLoader,
    },
  });
