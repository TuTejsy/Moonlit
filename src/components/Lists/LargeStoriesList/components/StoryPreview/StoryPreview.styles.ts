import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    descriptionText: {
      ...fonts.size_15,
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
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 16,
      position: 'relative',
    },
    previewContainer: {
      borderRadius: 16,
      height: 420,
      marginRight: 16,
      overflow: 'hidden',
      width: 280,
    },
    previewGradient: {
      height: 420,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 280,
    },
    titleText: {
      ...fonts.size_24,
      color: colors.white,
    },
  });
