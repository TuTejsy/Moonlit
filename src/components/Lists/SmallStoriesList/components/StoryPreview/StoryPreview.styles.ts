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
    lockIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    preview: {
      alignItems: 'flex-start',
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
      marginBottom: 24,
      marginRight: 16,
      maxWidth: PREVIEW_SIZE,
      position: 'relative',
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 16,
    },
  });
