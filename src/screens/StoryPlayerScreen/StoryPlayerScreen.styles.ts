import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { STORY_CONTAINER_MIN_WIDTH, STORY_COVER_MIN_HEIGHT } from './StoryPlayerScreen.constants';

interface Context {
  gradientColor: string;
  storyContainerMinHeight: number;
}

export const makeStyles = (
  { colors }: MakeStylesProps,
  { gradientColor, storyContainerMinHeight }: Context,
) =>
  StyleSheet.create({
    bottomGradient: {
      height: '100%',
      position: 'absolute',
      width: '100%',
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
      zIndex: 10,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: STORY_COVER_MIN_HEIGHT,
      minWidth: STORY_CONTAINER_MIN_WIDTH,
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
  });
