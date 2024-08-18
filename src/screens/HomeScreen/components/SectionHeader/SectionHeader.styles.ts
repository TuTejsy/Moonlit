import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    sectionHeaderContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: 34,
      justifyContent: 'space-between',
      paddingHorizontal: horizontalPadding,
    },
    seeAllText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.5),
    },
    titleText: {
      ...fonts.size_24,
      color: colors.white,
    },
  });
