import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    playerActionsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 34,
      width: 216,
    },
    playerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      position: 'absolute',
      width: WINDOW_WIDTH,
    },
    playerControllsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 48,
      width: 216,
    },
  });
