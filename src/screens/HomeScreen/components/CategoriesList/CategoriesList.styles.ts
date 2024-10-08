import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    categoriesList: {
      marginVertical: 30,
    },
    categoriesListContent: {
      paddingLeft: horizontalPadding,
    },
    categoryPreview: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderColor: colors.opacityWhite(0.1),
      borderRadius: 8,
      borderWidth: 1,
      height: 48,
      justifyContent: 'center',
      marginBottom: 16,
      paddingHorizontal: 8,
      width: 120,
    },
    categoryPreviewsContainer: {
      marginRight: 16,
    },
    cateogryText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.7),
      textAlign: 'center',
    },
  });
