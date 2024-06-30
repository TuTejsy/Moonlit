import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = (_props: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
  });
