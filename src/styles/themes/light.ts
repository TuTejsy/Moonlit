import { DefaultTheme as defaultNavigationTheme, Theme } from '@react-navigation/native';

import { commonColors } from './common';

const lightColors = {
  black900: '#1A1A1A',
  blue300: 'rgba(0, 119, 204, 0.1)',
  blue400: 'rgba(0, 119, 204, 0.16)',
  blue500: '#0077CC',
  blue600: '#006EBD',
  blue700: '#0068B2',

  gray100: '#F7F8FA',
  gray200: '#EBEDF0',
  gray300: '#E1E2E5',
  gray400: '#DCDDE0',
  gray500: '#C8C9CC',
  gray600: '#B4B5B8',
  gray700: '#A0A1A3',

  green300: 'rgba(9, 153, 81, 0.1)',
  green500: '#099951',

  orange300: 'rgba(250, 170, 50, 0.1)',
  orange500: '#FAAA32',
  orange600: '#EB9E2A',

  pink300: 'rgba(229, 46, 107, 0.08)',
  pink400: 'rgba(229, 46, 107, 0.16)',
  pink500: '#E52E6B',
  pink600: '#D62761',
  pink700: '#CC215A',
  pinkGradient: '#941E94',

  purple300: 'rgba(123, 62, 184, 0.1)',
  purple500: '#7B3EB8',
  purple600: '#7036A8',
};

export const lightTheme = {
  colors: { ...lightColors, ...commonColors },
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

export const lightNavTheme: Theme = {
  colors: {
    ...defaultNavigationTheme.colors,
    background: commonColors.white,
    border: lightColors.gray200,
    card: commonColors.white,
    primary: commonColors.white,
    text: lightColors.black900,
  },
  dark: false,
};
