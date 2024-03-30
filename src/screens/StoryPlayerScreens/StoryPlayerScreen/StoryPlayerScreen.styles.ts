import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { STORY_CONTAINER_MIN_WIDTH, STORY_COVER_MIN_HEIGHT } from './StoryPlayerScreen.constants';

interface Context {
  gradientColor: string;
  storyContainerMinHeight: number;
}

export const makeStyles = (
  { colors, zIndex }: MakeStylesProps,
  { gradientColor, storyContainerMinHeight }: Context,
) =>
  StyleSheet.create({
    bottomGradient: {
      height: WINDOW_HEIGHT,
      position: 'absolute',
      width: WINDOW_WIDTH,
    },
    cover: {
      minHeight: STORY_COVER_MIN_HEIGHT,
      minWidth: STORY_CONTAINER_MIN_WIDTH,
      width: '100%',
    },
    header: {
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: zIndex.main,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: STORY_COVER_MIN_HEIGHT,
      minWidth: STORY_CONTAINER_MIN_WIDTH,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
    screen: {
      alignItems: 'center',
      backgroundColor: colors.black,
      flex: 1,
      maxHeight: SCREEN_HEIGHT,
      maxWidth: SCREEN_WIDTH,
      position: 'relative',
    },
    storyContainer: {
      alignItems: 'center',
      backgroundColor: gradientColor,
      borderRadius: 16,
      minHeight: storyContainerMinHeight,
      minWidth: STORY_CONTAINER_MIN_WIDTH,
      overflow: 'hidden',
    },
    storyMeta: {
      minHeight: storyContainerMinHeight - STORY_COVER_MIN_HEIGHT,
    },
  });
