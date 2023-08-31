import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  horizontalInset: number;
}

export const makeStyles = (
  { colors, fonts, insets }: MakeStylesProps,
  { horizontalInset }: Context,
) => {
  const TOP_OFFSET = insets.top;
  const HEADER_HEIGHT = DEFAULT_HEADER_HEIGHT + TOP_OFFSET;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.transparent,
      flexDirection: 'row',
      height: HEADER_HEIGHT,
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: TOP_OFFSET,
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
      marginTop: TOP_OFFSET + 2,
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
      textAlign: 'center',
    },
  });
};
