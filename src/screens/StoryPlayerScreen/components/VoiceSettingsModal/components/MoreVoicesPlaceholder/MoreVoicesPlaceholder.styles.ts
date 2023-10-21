import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw }: MakeStylesProps) =>
  StyleSheet.create({
    audioRecordingContainer: {
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: dw(16),
      height: dw(184),
      marginBottom: 16,
      marginHorizontal: dw(7.5),
      overflow: 'hidden',
      width: dw(163),
    },
    image: {
      height: dw(184),
      width: dw(163),
    },
  });
