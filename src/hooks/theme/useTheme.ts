import { createContext, useContext } from 'react';

import { makeFonts } from '@/styles/fonts';
import { darkTheme } from '@/styles/themes/dark';

export enum ThemeValues {
  Dark = 'Dark',
}

export type ITheme = {
  fonts: ReturnType<typeof makeFonts>;
  onChangeTheme: (value: ThemeValues) => void;
  value: ThemeValues;
} & typeof darkTheme;

export const ThemeContext = createContext<ITheme | null>(null);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme can not be used outside ThemeProvider');
  }

  return theme;
};
