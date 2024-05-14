import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from './StoryPreview.constants';

export const makeStyles = ({ colors, fonts, zIndex }: MakeStylesProps) =>
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
      backgroundColor: colors.transparent,
      borderRadius: 16,
      flex: 1,
      height: PREVIEW_HEIGHT,
      justifyContent: 'flex-end',
      maxHeight: PREVIEW_HEIGHT,
      maxWidth: PREVIEW_WIDTH,
      width: PREVIEW_WIDTH,
    },
    previewContainer: {
      marginRight: 16,
      maxWidth: PREVIEW_WIDTH,
      position: 'relative',
    },
    previewGradient: {
      backgroundColor: colors.imagePurple,
      borderRadius: 16,
      height: PREVIEW_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: PREVIEW_WIDTH,
    },
    titleText: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: 8,
    },
  });
