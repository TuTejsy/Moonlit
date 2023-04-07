import { StyleSheet } from 'react-native';

import { dw } from '@/utils/sizes';

import { Fonts } from '@/constants/common';

export const makeFonts = () =>
  StyleSheet.create({
    captionCAPS: {
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    fontFamilyBold: {
      fontFamily: Fonts.ArialBold,
    },
    fontFamilyRegular: {
      fontFamily: Fonts.ArialRegular,
    },
    size_10: {
      fontSize: dw(10),
      lineHeight: dw(16),
    },
    size_11: {
      fontSize: dw(11),
      lineHeight: dw(16),
    },
    size_12: {
      fontSize: dw(12),
      lineHeight: dw(18),
    },
    size_13: {
      fontSize: dw(13),
      lineHeight: dw(18),
    },
    size_14: {
      fontSize: dw(14),
      lineHeight: dw(20),
    },
    size_15: {
      fontSize: dw(15),
      lineHeight: dw(22),
    },
    size_15_20: {
      fontSize: dw(15),
      lineHeight: dw(20),
    },
    size_16: {
      fontSize: dw(16),
      lineHeight: dw(24),
    },
    size_16_22: {
      fontSize: dw(16),
      lineHeight: dw(22),
    },
    size_18: {
      fontSize: dw(18),
      lineHeight: dw(26),
    },
  });
