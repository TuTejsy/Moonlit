import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PREVIEW_SIZE } from './StoryPreview.constants';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    descriptionText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.7),
      marginTop: 4,
    },
    preview: {
      alignItems: 'flex-start',
      borderRadius: 16,
      flex: 1,
      height: PREVIEW_SIZE,
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 16,
      position: 'relative',
      width: PREVIEW_SIZE,
    },
    previewContainer: {
      marginBottom: 24,
      marginRight: 16,
      maxWidth: PREVIEW_SIZE,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 16,
    },
  });
