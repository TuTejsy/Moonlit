import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    view: {
      backgroundColor: colors.white,
      height: DEFAULT_HEADER_HEIGHT,
      position: 'absolute',
      top: -DEFAULT_HEADER_HEIGHT,
      width: '100%',
      zIndex: zIndex.shadow,
    },
  });
