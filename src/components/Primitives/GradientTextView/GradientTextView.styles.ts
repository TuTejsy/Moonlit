import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    maskedText: { backgroundColor: colors.transparent },
    text: {
      opacity: 0,
    },
  });
