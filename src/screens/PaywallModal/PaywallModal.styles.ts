import { StyleSheet } from 'react-native';

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
      marginTop: dh(16),
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
      paddingTop: 24,
      position: 'relative',
    },
    promotionSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      marginTop: dh(8),
    },
    promotionTitle: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: dh(24),
      textAlign: 'center',
    },
    screen: {
      backgroundColor: colors.purple,
      flex: 1,
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      width: '100%',
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
      marginTop: dh(8),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
    },
    unlockButton: {
      backgroundColor: colors.white,
      borderRadius: 32,
      marginTop: dh(16),
      paddingHorizontal: 34,
      paddingVertical: 13,
    },
    unlockButtonText: {
      ...fonts.size_16,
      color: colors.darkPurple,
    },
    voicesImage: {
      height: dw(72),
      marginBottom: dh(40),
      marginTop: dh(24),
      width: dw(308),
    },
  });
