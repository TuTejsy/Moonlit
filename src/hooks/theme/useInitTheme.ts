import { useCallback, useMemo, useState } from 'react';

import { makeFonts } from '@/styles/fonts';
import { lightTheme } from '@/styles/themes/light';
import { dh, dw } from '@/utils/sizes';

import { ThemeValues } from './useTheme';

export const useInitTheme = () => {
  const [themeValue, setThemeValue] = useState(ThemeValues.Light);

  const onChangeTheme = useCallback((value: ThemeValues) => {
    setThemeValue(value);
  }, []);

  const theme = useMemo(() => {
    if (ThemeValues.Light === themeValue) {
      return lightTheme;
    }

    return lightTheme;
  }, [themeValue]);

  return useMemo(
    () => ({
      ...theme,
      dh,
      dw,
      fonts: makeFonts(),
      onChangeTheme,
      value: themeValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeValue, onChangeTheme],
  );
};
