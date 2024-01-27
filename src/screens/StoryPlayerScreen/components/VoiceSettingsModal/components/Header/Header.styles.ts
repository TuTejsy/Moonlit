import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets, zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    closeIcon: {
      left: 16,
      position: 'absolute',
    },
    header: {
      paddingLeft: 12,
    },
    subTitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    title: {
      ...fonts.size_16,
      color: colors.white,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: DEFAULT_HEADER_HEIGHT,
      justifyContent: 'center',
      marginTop: insets.top,
      position: 'relative',
      width: WINDOW_WIDTH,
    },
  });
