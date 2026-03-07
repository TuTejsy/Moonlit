import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  horizontalPadding,
  sufficientWindowWidth,
  windowMaxWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    freeTrialContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      flexDirection: 'row',
      height: dw(72, windowMaxWidth),
      marginTop: dh(24),
      paddingLeft: horizontalPadding,
      paddingRight: 24,
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    freeTrialSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      marginTop: dh(4),
    },
    freeTrialSwitch: {
      alignSelf: 'center',
    },
    freeTrialTextContainer: {
      flex: 1,
    },
    freeTrialTitle: {
      ...fonts.size_16,
      color: colors.white,
    },
  });
