import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PREVIEW_SIZE } from './StoryPreview.constants';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    descriptionText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginTop: 4,
    },
    lockIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    preview: {
      alignItems: 'flex-start',
      backgroundColor: colors.transparent,
      borderRadius: 16,
      flex: 1,
      height: PREVIEW_SIZE,
      justifyContent: 'flex-end',
      maxHeight: PREVIEW_SIZE,
      maxWidth: PREVIEW_SIZE,
      paddingHorizontal: 16,
      paddingVertical: 16,
      width: PREVIEW_SIZE,
    },
    previewContainer: {
      marginRight: 16,
      maxWidth: PREVIEW_SIZE,
      position: 'relative',
    },
    previewGradient: {
      backgroundColor: colors.imagePurple,
      borderRadius: 16,
      height: PREVIEW_SIZE,
      left: 0,
      position: 'absolute',
      top: 0,
      width: PREVIEW_SIZE,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 16,
    },
  });
