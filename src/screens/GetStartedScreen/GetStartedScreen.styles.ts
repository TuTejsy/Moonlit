import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    continueButton: {
      borderColor: colors.opacityWhite(0.2),
      borderRadius: 24,
      borderWidth: 1,
      paddingHorizontal: 57,
      paddingVertical: 13,
    },
    continueText: {
      ...fonts.size_16,
      color: colors.white,
    },
    controls: {
      alignItems: 'center',
      width: '100%',
    },
    description: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.5),
      paddingHorizontal: 32,
      textAlign: 'center',
    },
    image: {},
    indicatorsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 17,
      marginTop: 19,
    },
    screen: {
      alignItems: 'flex-start',
      flex: 1,
      paddingBottom: insets.bottom,
      paddingTop: insets.top,
    },
    stepContainer: {
      width: WINDOW_WIDTH,
    },
    stepDescriptionsContainer: {
      flexDirection: 'row',
      marginTop: 16,
    },
    stepTitlesContainer: {
      flexDirection: 'row',
    },
    stepsContentContainer: {
      alignItems: 'flex-start',
      flex: 1,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      paddingHorizontal: 32,
      textAlign: 'center',
    },
  });
