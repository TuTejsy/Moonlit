import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

const TRACK_HEIGHT = 8;
const TRACK_RADIUS = 32;

export const makeStyles = ({ colors, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      height: TRACK_HEIGHT,
      marginHorizontal: horizontalPadding,
      position: 'relative',
    },
    filledTrack: {
      borderRadius: TRACK_RADIUS,
      height: TRACK_HEIGHT,
      width: 0,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    track: {
      backgroundColor: colors.opacityWhite(0.2),
      borderRadius: TRACK_RADIUS,
      height: TRACK_HEIGHT,
      width: '100%',
    },
  });
