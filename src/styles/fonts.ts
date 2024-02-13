import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/common';

export const makeFonts = () =>
  StyleSheet.create({
    captionCAPS: {
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    fontFamilyBold: {
      fontFamily: Fonts.PoppinsSemiBold,
    },
    fontFamilyMedium: {
      fontFamily: Fonts.PoppinsMedium,
    },
    fontFamilyRegular: {
      fontFamily: Fonts.PoppinsRegular,
    },
    size_10: {
      fontSize: 10,
      lineHeight: 16,
    },
    size_11: {
      fontSize: 11,
      lineHeight: 16,
    },
    size_12: {
      fontSize: 12,
      lineHeight: 18,
    },
    size_13: {
      fontSize: 13,
      lineHeight: 18,
    },
    size_14: {
      fontSize: 14,
      lineHeight: 20,
    },
    size_15: {
      fontSize: 15,
      lineHeight: 22,
    },
    size_15_20: {
      fontSize: 15,
      lineHeight: 20,
    },
    size_16: {
      fontSize: 16,
      lineHeight: 24,
    },
    size_16_22: {
      fontSize: 16,
      lineHeight: 22,
    },
    size_18: {
      fontSize: 18,
      lineHeight: 26,
    },
    size_24: {
      fontSize: 24,
      lineHeight: 34,
    },
    size_32: {
      fontSize: 32,
      lineHeight: 35.2,
    },
    size_40: {
      fontSize: 40,
      lineHeight: 44,
    },
  });
