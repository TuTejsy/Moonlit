import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  storyContainerMinHeight: number;
}

export const makeStyles = (
  { colors, insets }: MakeStylesProps,
  { storyContainerMinHeight }: Context,
) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 16,
      paddingTop: insets.top,
    },
    screen: {
      flex: 1,
    },
  });
