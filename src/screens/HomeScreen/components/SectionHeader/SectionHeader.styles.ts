import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    sectionHeaderContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: 34,
      justifyContent: 'space-between',
    },
    seeAllText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    titleText: {
      ...fonts.size_24,
      color: colors.white,
    },
  });
