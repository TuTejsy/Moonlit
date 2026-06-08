import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = (_props: MakeStylesProps) =>
  StyleSheet.create({
    homeScreen: {
      ...StyleSheet.absoluteFill,
    },
    screen: {
      flex: 1,
    },
  });
