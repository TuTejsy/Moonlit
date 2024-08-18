import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { StoryPlayerScreenLayout } from '../../hooks/useStoryPlayerScreenLayout';


export const makeStyles = (
  { colors, dh, fonts, horizontalPadding }: MakeStylesProps, 
  { storyContainerMinWidth }: StoryPlayerScreenLayout) =>
  StyleSheet.create({
    durationText: {
      ...fonts.size_14,
      color: colors.opacityWhite(1),
    },
    durationTitle: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
    },
    storyMetaContainer: {
      backgroundColor: colors.opacityBlack(0.4),
      flex: 1,
      paddingHorizontal: horizontalPadding,
      paddingTop: dh(32),
      width: storyContainerMinWidth,
    },
    storyText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginBottom: dh(32),
      marginTop: dh(14),
    },
  });
