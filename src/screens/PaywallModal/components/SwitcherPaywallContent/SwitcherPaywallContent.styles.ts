import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    freeTrialContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      flexDirection: 'row',
      height: dw(72),
      marginTop: dh(24),
      paddingLeft: HORIZONTAL_PADDING,
      paddingRight: 24,
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    freeTrialSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      marginTop: dh(4),
    },
    freeTrialSwitch: {
      height: 28,
      width: 52,
    },
    freeTrialTextContainer: {
      flex: 1,
    },
    freeTrialTitle: {
      ...fonts.size_16,
      color: colors.white,
    },
    promotionText: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: dh(32),
      textAlign: 'center',
    },
    subtitle: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.7),
      marginTop: dh(16),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_40,
      color: colors.white,
      textAlign: 'center',
    },
    voicesImage: {
      height: dw(140),
      marginTop: dh(40),
      width: WINDOW_WIDTH,
    },
  });
