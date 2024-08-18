import { StyleSheet } from 'react-native';

import { IS_ANDROID } from '@/constants/common';
import { WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { STORY_CONTAINER_MIN_WIDTH } from '../../StoryPlayerScreen.constants';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    actions: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionsContainer: {
      bottom: 0,
      paddingHorizontal: HORIZONTAL_PADDING,
      position: 'absolute',
      width: STORY_CONTAINER_MIN_WIDTH,
      zIndex: 10,
    },
    button: StyleSheet.flatten([
      {
        alignItems: 'center',
        borderRadius: 24,
        height: 48,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 48,
      },
      IS_ANDROID && {
        backgroundColor: colors.opacityWhite(0.3),
      },
    ]),
    buttonBlurView: {
      height: 48,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 48,
    },
    listenButton: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 24,
      flex: 1,
      flexDirection: 'row',
      height: 48,
      justifyContent: 'center',
      marginRight: 16,
      paddingHorizontal: 8,
      position: 'relative',
    },
    listenText: {
      ...fonts.size_16,
      color: colors.darkBlack,
      marginLeft: 19,
    },
    playIcon: {
      left: 8,
      position: 'absolute',
      top: 8,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      marginBottom: dh(32),
    },
  });
