import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
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
      marginLeft: 24,
    },
    unlockIcon: {
      marginRight: 8,
    },
  });
