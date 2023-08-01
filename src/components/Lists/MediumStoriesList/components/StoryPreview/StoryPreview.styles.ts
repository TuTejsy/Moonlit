import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    descriptionText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.6),
      marginTop: 4,
    },
    lockIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    preview: {
      alignItems: 'flex-start',
      borderRadius: 16,
      flex: 1,
      height: 180,
      justifyContent: 'flex-end',
      maxHeight: 180,
      maxWidth: 260,
      paddingHorizontal: 16,
      paddingVertical: 16,
      width: 260,
    },
    previewContainer: {
      marginRight: 16,
      maxWidth: 260,
      position: 'relative',
    },
    titleText: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: 8,
    },
  });
