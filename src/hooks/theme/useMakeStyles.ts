import { useMemo } from 'react';

import { useSafeAreaInsets, WithSafeAreaInsetsProps } from 'react-native-safe-area-context';

import { ITheme, useTheme } from './useTheme';

export type MakeStylesProps = ITheme & WithSafeAreaInsetsProps;
type MakeStylesGenerator<T, C> = (theme: MakeStylesProps, styleContext: C) => T;

export const useMakeStyles = <T extends object, C extends object>(
  makeStyles: MakeStylesGenerator<T, C>,
  styleContext: C = {} as any,
) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return useMemo(
    () => makeStyles({ ...theme, insets }, styleContext),
    [makeStyles, theme, insets, styleContext],
  );
};
