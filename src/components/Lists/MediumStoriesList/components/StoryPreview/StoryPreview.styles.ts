import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    descriptionText: {
      ...fonts.size_10,
      color: colors.opacityWhite(0.6),
      marginTop: 4,
    },
    preview: {
      alignItems: 'flex-start',
      borderRadius: 16,
      flex: 1,
      height: 180,
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 16,
      position: 'relative',
      width: 260,
    },
    previewContainer: {
      marginRight: 16,
      maxWidth: 260,
    },
    titleText: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: 8,
    },
  });
