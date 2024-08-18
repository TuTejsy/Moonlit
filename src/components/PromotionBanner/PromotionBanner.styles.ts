import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PROMOTION_BANNER_HEIGHT, PROMOTION_BANNER_WIDTH } from './PromotionBanner.constants';

export const makeStyles = ({ colors, fonts, horizontalPadding, windowMaxWidth }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
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
      maxWidth: windowMaxWidth,
      paddingHorizontal: horizontalPadding,
    },
    image: {
      height: 360,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    imageGradient: {
      height: 360,
      left: 0,
      position: 'absolute',
      top: 0,
      width: PROMOTION_BANNER_WIDTH,
    },
    subtitle: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 16,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
    },
    voicesImage: {
      marginTop: 24,
    },
  });
