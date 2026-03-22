import { StyleSheet } from 'react-native';

import type { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  fonts,
  horizontalPadding,
  insets,
  sufficientWindowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    createVoiceButton: {
      marginHorizontal: horizontalPadding,
    },
    createVoiceTitle: {
      ...fonts.size_24_29,
      color: colors.white,
    },
    gradient: {
      flex: 1,
    },
    gradientButton: {
      opacity: 0.2,
      width: sufficientWindowWidth - horizontalPadding * 2,
    },
    gradientButtonContainer: {
      marginHorizontal: horizontalPadding,
      marginTop: 16,
    },
    screen: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: insets.bottom + 100,
      paddingTop: insets.top + 20,
    },
    sectionHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: horizontalPadding,
    },
    sectionTitle: {
      ...fonts.size_24,
      color: colors.white,
    },
    seeAllText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.7),
    },
    stepLabel: {
      ...fonts.size_12,
      color: colors.accentPurple,
      lineHeight: 18,
      marginBottom: 4,
      paddingHorizontal: horizontalPadding,
    },
    stepSection: {
      marginTop: 24,
    },
    titleRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: horizontalPadding,
    },
  });
