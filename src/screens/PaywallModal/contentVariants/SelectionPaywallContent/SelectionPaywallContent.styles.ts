import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    freeTrialContainer: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.2),
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      height: dw(56),
      justifyContent: 'space-between',
      marginTop: dh(12),
      paddingLeft: HORIZONTAL_PADDING,
      paddingRight: 24,
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    freeTrialSwitch: {
      height: 28,
      width: 52,
    },
    freeTrialText: {
      ...fonts.size_12,
      color: colors.white,
    },
    productContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      flexDirection: 'row',
      height: dw(56),
      justifyContent: 'space-between',
      marginTop: dh(12),
      paddingLeft: HORIZONTAL_PADDING,
      paddingRight: 24,
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    promotionText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.2),
      marginTop: dh(16),
      textAlign: 'center',
    },
    selectedProductContainer: {
      borderColor: colors.borderPurple,
      borderWidth: 1,
    },
    subtitle: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginTop: dh(8),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_40,
      color: colors.white,
      textAlign: 'center',
    },
    voicesImage: {
      height: dw(140),
      marginBottom: dh(22),
      marginTop: dh(18),
      width: WINDOW_WIDTH,
    },
  });
