import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { STORY_CONTAINER_MIN_WIDTH, STORY_COVER_MIN_HEIGHT } from './StoryPlayerScreen.constants';

interface Context {
  storyContainerMinHeight: number;
}

export const makeStyles = (
  { colors, dw, insets }: MakeStylesProps,
  { storyContainerMinHeight }: Context,
) =>
  StyleSheet.create({
    cover: {
      minHeight: STORY_COVER_MIN_HEIGHT,
      minWidth: STORY_CONTAINER_MIN_WIDTH,
      width: '100%',
    },
    gradient: {
      height: '100%',
      position: 'absolute',
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
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      minHeight: storyContainerMinHeight,
      minWidth: STORY_CONTAINER_MIN_WIDTH,
      overflow: 'hidden',
    },
  });
