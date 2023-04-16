import { DefaultTheme as defaultNavigationTheme, Theme } from '@react-navigation/native';

import { commonColors } from './common';

const darkColors = {
  dark: '#2D2D2D',
  dark_grey: '#1A1A1A',
  orange: '#EC7748',
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
    text: darkColors.white,
  },
  dark: true,
};
