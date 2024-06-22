import { DefaultTheme as defaultNavigationTheme, Theme } from '@react-navigation/native';

import { commonColors } from './common';

export const darkColors = {
  dark: '#2D2D2D',
  darkBlack: '#141C1A',
  darkGradientPurple: '#0A0315',
  darkGrey: '#1A1A1A',
  darkPurple: '#080211',
  green: '#247F8A',
  imagePurple: '#4C3F55',
  borderPurple: '#D44BED',
  lightGradientPurple: '#1E004E',
  lightPurple: '#1F0647',
  opacityDarkPurple: (float: number) => `rgba(8, 12, 17, ${float})`,
  opacityGreen: (float: number) => `rgba(36, 127, 138, ${float})`,
  opacityLightGradientPurple: (float: number) => `rgba(26, 0, 67, ${float})`,
  opacityLightPurple: (float: number) => `rgba(31, 6, 71, ${float})`,
  opacityOrange: (float: number) => `rgba(236, 119, 72, ${float})`,
  opacityPurple: (float: number) => `rgba(23, 6, 52, ${float})`,
  opacitySkin: (float: number) => `rgba(202, 166, 144, ${float})`,
  orange: '#EC7748',
  purple: '#170634',
};

export const darkTheme = {
  colors: { ...darkColors, ...commonColors },
  indicatorStyle: 'black' as 'black' | 'white' | 'default',
  zIndex: {
    backgroundLoader: 100010,
    icon: 100,
    main: 1,
    max: Number.MAX_SAFE_INTEGER,
    overMain: 2,
    shadow: 100000,
    underMain: -1,
    zero: 0,
  } as const,
};

export const darkNavTheme: Theme = {
  colors: {
    ...defaultNavigationTheme.colors,
    background: commonColors.black,
    card: commonColors.white,
    primary: commonColors.white,
    text: commonColors.white,
  },
  dark: true,
};
