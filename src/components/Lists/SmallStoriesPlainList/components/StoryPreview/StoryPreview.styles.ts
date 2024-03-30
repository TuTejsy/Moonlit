import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      marginLeft: 16,
      width: 32,
    },
    content: {
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'center',
      marginLeft: 16,
    },
    descriptionText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginTop: 4,
    },
    imageContainer: {
      position: 'relative',
    },
    lockIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    preview: {
      borderRadius: 16,
      height: 100,
      width: 100,
    },
    previewContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 16,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });
