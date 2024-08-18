import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PromotionBannerLayout } from './hooks/usePromotionBannerLayout';

export const makeStyles = (
  { colors, fonts, horizontalPadding, windowMaxWidth }: MakeStylesProps,
  { promotionBannerHeight, promotionBannerWidth }: PromotionBannerLayout,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.lightPurple,
      borderRadius: 16,
      height: promotionBannerHeight,
      overflow: 'hidden',
      position: 'relative',
      width: promotionBannerWidth,
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
      width: promotionBannerWidth,
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
