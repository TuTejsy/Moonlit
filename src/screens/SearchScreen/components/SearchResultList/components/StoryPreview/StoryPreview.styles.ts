import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'center',
      marginLeft: 16,
    },
    descriptionText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.7),
      marginTop: 4,
    },
    preview: {
      borderRadius: 16,
      height: 100,
      width: 100,
    },
    previewContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });
