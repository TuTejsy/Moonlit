import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { LARGE_TITLE_HEIGHT } from './ScreenHeader.constants';

interface Context {
  horizontalInset: number;
  color?: string;
}

export const makeStyles = (
  { colors, fonts, horizontalPadding, insets, zIndex }: MakeStylesProps,
  { color, horizontalInset }: Context,
) => {
  const HEADER_HEIGHT = DEFAULT_HEADER_HEIGHT;

  return StyleSheet.create({
    container: {
      backgroundColor: color ?? colors.transparent,
      paddingHorizontal: horizontalPadding,
      paddingTop: insets.top,
      position: 'relative',
    },
    controls: {
      flex: 1,
    },
    headerContainer: {
      alignItems: 'center',
      backgroundColor: color ?? colors.transparent,
      flexDirection: 'row',
      height: HEADER_HEIGHT,
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: zIndex.overMain,
    },
    largeTitle: {
      ...fonts.size_24,
      bottom: -LARGE_TITLE_HEIGHT + 16,
      color: colors.white,
      left: horizontalPadding,
      position: 'absolute',
    },
    subtitleText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.5),
      textAlign: 'center',
    },
    title: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginTop: 2,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      textAlign: 'center',
    },
  });
};
