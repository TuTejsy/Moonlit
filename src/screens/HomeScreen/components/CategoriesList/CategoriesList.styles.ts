import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    categoriesList: {
      marginBottom: 32,
      marginTop: 40,
    },
    categoriesListContent: {
      paddingLeft: HORIZONTAL_PADDING,
    },
    categoryPreview: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderColor: colors.opacityWhite(0.1),
      borderRadius: 8,
      borderWidth: 1,
      height: 48,
      justifyContent: 'center',
      marginBottom: 8,
      paddingHorizontal: 8,
      width: 108,
    },
    categoryPreviewsContainer: {
      marginRight: 8,
    },
    cateogryText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.7),
      textAlign: 'center',
    },
  });
