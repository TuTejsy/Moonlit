import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PREVIEW_SIZE } from './StoryPreview.constants';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    comingSoonLabel: {
      backgroundColor: colors.opacityWhite(0.2),
      borderRadius: 50,
      paddingHorizontal: 11,
      paddingVertical: 4,
      position: 'absolute',
    },
    comingSoonOverlay: {
      backgroundColor: colors.opacityBlack(0.5),
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    comingSoonText: {
      ...fonts.size_12,
    },
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
      flex: 1,
      height: PREVIEW_SIZE,
      justifyContent: 'flex-end',
      maxHeight: PREVIEW_SIZE,
      maxWidth: PREVIEW_SIZE,
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
    previewImageContainer: {
      alignItems: 'center',
      borderRadius: 16,
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 16,
    },
  });
