import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PROMOTION_BANNER_HEIGHT, PROMOTION_BANNER_WIDTH } from './PromotionBanner.constants';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.2),
      borderRadius: 24,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      marginTop: 25,
      maxHeight: 48,
    },
    buttonText: {
      ...fonts.size_16,
      color: colors.white,
      marginLeft: 23,
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
    unlockIcon: {
      marginRight: 8,
    },
    voicesImage: {
      marginTop: 24,
      paddingHorizontal: 18,
    },
  });
