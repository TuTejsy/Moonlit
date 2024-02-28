import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    action: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      marginHorizontal: 19,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: dh(24),
    },
    bottomOverlayGradient: {
      bottom: 0,
      height: (WINDOW_HEIGHT * 2) / 3,
      left: 0,
      position: 'absolute',
      width: WINDOW_WIDTH,
    },
    content: {
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: insets.top,
      overflow: 'hidden',
      paddingBottom: insets.bottom + dh(8),
      paddingHorizontal: 34,
      paddingTop: dh(24),
      position: 'relative',
    },
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
    image: {
      height: WINDOW_HEIGHT - insets.top - insets.bottom - 120,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    promotionText: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: dh(32),
      textAlign: 'center',
    },
    screen: {
      backgroundColor: colors.purple,
      flex: 1,
    },
    skipText: {
      ...fonts.size_14,
      color: colors.white,
      left: 32,
      position: 'absolute',
      top: 24,
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
    topOverlayGradient: {
      height: (WINDOW_HEIGHT * 2) / 3,
      left: 0,
      position: 'absolute',
      top: 0,
      width: WINDOW_WIDTH,
    },
    unlockButton: {
      marginTop: dh(16),
    },
    unlockButtonGradient: {
      alignItems: 'center',
      borderRadius: 32,
      height: dw(48),
      justifyContent: 'center',
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    unlockButtonText: {
      ...fonts.size_16,
      color: colors.white,
    },
    voicesImage: {
      height: dw(140),
      marginTop: dh(40),
      width: WINDOW_WIDTH,
    },
  });
