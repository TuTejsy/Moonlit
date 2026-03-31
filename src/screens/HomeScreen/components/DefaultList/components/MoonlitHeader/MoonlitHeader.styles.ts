import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
    },
    iconContainer: {
      marginBottom: 8,
      zIndex: 1,
    },
    starsContainer: {
      height: 122,
      position: 'absolute',
      top: 46,
      width: 312,
      zIndex: 0,
    },
    subtitle: {
      ...fonts.size_12,
      color: colors.white,
      fontFamily: fonts.fontFamilyRegular.fontFamily,
      marginTop: 12,
      opacity: 0.5,
      textAlign: 'center',
    },
    title: {
      ...fonts.size_20,
      fontFamily: fonts.fontFamilyBold.fontFamily,
      textAlign: 'center',
    },
  });
