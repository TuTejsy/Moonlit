import { useCallback, useMemo, useState } from 'react';

import { makeFonts } from '@/styles/fonts';
import { darkTheme } from '@/styles/themes/dark';

import { ThemeValues } from './useTheme';

export const useInitTheme = () => {
  const [themeValue, setThemeValue] = useState(ThemeValues.Dark);

  const onChangeTheme = useCallback((value: ThemeValues) => {
    setThemeValue(value);
  }, []);

  const theme = useMemo(() => {
    if (ThemeValues.Dark === themeValue) {
      return darkTheme;
    }

    return darkTheme;
  }, [themeValue]);

  return useMemo(
    () => ({
      ...theme,
      fonts: makeFonts(),
      onChangeTheme,
      value: themeValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeValue, onChangeTheme],
  );
};
