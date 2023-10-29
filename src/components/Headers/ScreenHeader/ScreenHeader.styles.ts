import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { LARGE_TITLE_HEIGHT } from './ScreenHeader.constants';

interface Context {
  horizontalInset: number;
  color?: string;
}

export const makeStyles = (
  { colors, fonts, insets }: MakeStylesProps,
  { color, horizontalInset }: Context,
) => {
  const HEADER_HEIGHT = DEFAULT_HEADER_HEIGHT;

  return StyleSheet.create({
    container: {
      backgroundColor: color ?? colors.transparent,
      paddingHorizontal: 16,
      paddingTop: insets.top,
    },
    headerContainer: {
      alignItems: 'center',
      backgroundColor: color ?? colors.transparent,
      flexDirection: 'row',
      height: HEADER_HEIGHT,
      justifyContent: 'space-between',
      zIndex: 2,
    },
    largeTitle: {
      ...fonts.size_24,
      color: colors.white,
      textAlign: 'center',
    },
    largeTitleContainer: {
      alignItems: 'flex-start',
      height: LARGE_TITLE_HEIGHT,
      justifyContent: 'flex-end',
      paddingBottom: 16,
      zIndex: 1,
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
      marginHorizontal: 24 + horizontalInset,
      marginTop: 2,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      textAlign: 'center',
    },
  });
};
