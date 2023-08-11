import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PROMOTION_BANNER_HEIGHT, PROMOTION_BANNER_WIDTH } from './PromotionBanner.constants';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 24,
      flex: 1,
      justifyContent: 'center',
      marginBottom: 16,
      marginTop: 22,
      maxHeight: 48,
    },
    buttonText: {
      ...fonts.size_16,
      color: colors.black,
    },
    container: {
      backgroundColor: colors.lightPurple,
      borderRadius: 16,
      height: PROMOTION_BANNER_HEIGHT,
      overflow: 'hidden',
      position: 'relative',
      width: PROMOTION_BANNER_WIDTH,
    },
    content: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    image: {
      left: 0,
      position: 'absolute',
      top: 0,
    },
    subtitle: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 8,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
    },
  });
