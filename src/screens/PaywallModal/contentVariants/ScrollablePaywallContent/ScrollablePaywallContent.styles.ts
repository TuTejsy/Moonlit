import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      marginTop: dh(14),
    },
    content: {
      alignItems: 'center',
    },
    footerAction: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.2),
      textDecorationLine: 'underline',
    },
    footerActions: {
      height: 38,
    },
    price: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.6),
      marginTop: dh(16),
    },
    promotionText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.3),
      marginTop: dh(16),
      textAlign: 'center',
    },
    subscriptionInfo: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.3),
      flex: 1,
      paddingHorizontal: 32,
      textAlign: 'center',
    },
  });
