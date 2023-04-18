import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    categoriesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    category: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.1),
      borderRadius: 100,
      borderWidth: 1,
      height: 32,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    categoryText: {
      ...fonts.size_11,
      color: colors.white,
    },
    storyMetaContainer: {
      paddingHorizontal: 16,
      width: SCREEN_WIDTH - 32,
    },
    storyText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginBottom: 16,
      minHeight: 311,
    },
  });
