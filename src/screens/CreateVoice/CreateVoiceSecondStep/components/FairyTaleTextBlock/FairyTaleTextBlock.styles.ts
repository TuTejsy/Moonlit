import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

const CONTAINER_BORDER_RADIUS = 16;
const LEFT_BORDER_WIDTH = 3;

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    activeParagraphText: {
      color: colors.white,
    },
    bottomSpacer: {
      height: 80,
    },
    container: {
      backgroundColor: colors.opacityWhite(0.05),
      borderColor: colors.opacityWhite(0.1),
      borderRadius: CONTAINER_BORDER_RADIUS,
      borderWidth: 1,
      height: 395,
      marginHorizontal: horizontalPadding,
      overflow: 'hidden',
      paddingHorizontal: 17,
      paddingTop: 17,
      marginTop: 20,
    },
    inactiveParagraphText: {
      color: colors.opacityWhite(0.3),
    },
    paragraphContainer: {
      borderLeftColor: colors.transparent,
      borderLeftWidth: LEFT_BORDER_WIDTH,
      paddingLeft: 0,
    },
    paragraphText: {
      ...fonts.size_16_28,
    },
  });
