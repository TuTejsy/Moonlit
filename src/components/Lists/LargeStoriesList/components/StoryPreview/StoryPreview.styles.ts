import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from './StoryPreview.constants';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    descriptionText: {
      ...fonts.size_15,
      color: colors.opacityWhite(0.6),
      marginTop: 4,
    },
    emptyImageStyle: {
      marginBottom: 83,
    },
    imageGradient: {
      backgroundColor: colors.imagePurple,
      height: PREVIEW_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: PREVIEW_WIDTH,
    },
    lockIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    preview: {
      alignItems: 'flex-start',
      backgroundColor: colors.transparent,
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 16,
      position: 'relative',
    },
    previewContainer: {
      borderRadius: 16,
      height: PREVIEW_HEIGHT,
      marginRight: 16,
      overflow: 'hidden',
      width: PREVIEW_WIDTH,
    },
    previewGradient: {
      height: PREVIEW_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: PREVIEW_WIDTH,
    },
    titleText: {
      ...fonts.size_24,
      color: colors.white,
    },
  });
