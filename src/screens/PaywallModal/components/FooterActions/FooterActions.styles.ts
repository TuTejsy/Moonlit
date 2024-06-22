import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    action: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      marginHorizontal: 19,
    },
    actions: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      height: dh(49),
      justifyContent: 'center',
      paddingBottom: dh(8),
    },
  });
