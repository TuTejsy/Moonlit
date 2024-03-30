import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    bold: {
      ...fonts.fontFamilyBold,
    },
    medium: {
      ...fonts.fontFamilyMedium,
    },
    regular: {
      ...fonts.fontFamilyRegular,
    },
    text: {
      ...fonts.size_14,
      color: colors.white,
    },
  });
