import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { STORY_CONTAINER_MIN_WIDTH } from '../../StoryPlayerScreen.constants';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
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
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: dh(32),
      width: STORY_CONTAINER_MIN_WIDTH,
    },
    storyText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginBottom: dh(32),
      marginTop: dh(14),
    },
  });
