import { createContext, useContext } from 'react';

import { makeFonts } from '@/styles/fonts';
import { relativeSizes } from '@/styles/sizes';
import { lightTheme } from '@/styles/themes/light';

export enum ThemeValues {
  Light = 'Light',
}

export type ITheme = {
  fonts: ReturnType<typeof makeFonts>;
  onChangeTheme: (value: ThemeValues) => void;
  value: ThemeValues;
} & typeof lightTheme &
  typeof relativeSizes;

export const ThemeContext = createContext<ITheme | null>(null);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme can not be used outside ThemeProvider');
  }

  return theme;
};
