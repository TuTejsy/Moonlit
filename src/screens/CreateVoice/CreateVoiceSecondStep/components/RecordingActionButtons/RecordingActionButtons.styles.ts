import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

const BUTTON_HEIGHT = 48;
const BUTTON_WIDTH = 105;
const BUTTON_RADIUS = 32;

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'center',
      backgroundColor: colors.opacityPink(0.1),
      borderRadius: BUTTON_RADIUS,
      height: BUTTON_HEIGHT,
      justifyContent: 'center',
      width: BUTTON_WIDTH,
    },
    backButtonText: {
      ...fonts.size_16,
      color: colors.white,
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 14,
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: insets.bottom + 18,
    },
    saveButton: {
      borderRadius: BUTTON_RADIUS,
      height: BUTTON_HEIGHT,
      overflow: 'hidden',
      width: BUTTON_WIDTH,
    },
    saveButtonGradient: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    saveButtonText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });
