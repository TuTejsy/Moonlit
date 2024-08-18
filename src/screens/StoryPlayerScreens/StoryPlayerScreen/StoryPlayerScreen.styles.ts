import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { StoryPlayerScreenLayout } from './hooks/useStoryPlayerScreenLayout';

interface Context extends StoryPlayerScreenLayout {
  gradientColor: string;
  storyContainerMinHeight: number;
}

export const makeStyles = (
  { colors, windowHeight, windowWidth, zIndex }: MakeStylesProps,
  { gradientColor, storyContainerMinHeight, storyContainerMinWidth, storyCoverMinHeight }: Context,
) =>
  StyleSheet.create({
    bottomGradient: {
      height: windowHeight,
      position: 'absolute',
      width: windowWidth,
    },
    cover: {
      minHeight: storyCoverMinHeight,
      minWidth: storyContainerMinWidth,
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
      minHeight: storyCoverMinHeight,
      minWidth: storyContainerMinWidth,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
    screen: {
      alignItems: 'center',
      backgroundColor: colors.black,
      flex: 1,
      maxHeight: windowHeight,
      maxWidth: windowWidth,
      position: 'relative',
    },
    storyContainer: {
      alignItems: 'center',
      backgroundColor: gradientColor,
      borderRadius: 16,
      minHeight: storyContainerMinHeight,
      minWidth: storyContainerMinWidth,
      overflow: 'hidden',
    },
    storyMeta: {
      minHeight: storyContainerMinHeight - storyCoverMinHeight,
    },
  });
