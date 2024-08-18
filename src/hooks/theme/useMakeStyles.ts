import { useMemo } from 'react';

import { useSafeAreaInsets, WithSafeAreaInsetsProps } from 'react-native-safe-area-context';

import { Layout, useLayout } from './useLayout';
import { ITheme, useTheme } from './useTheme';

export type MakeStylesProps = ITheme & Layout & WithSafeAreaInsetsProps;
type MakeStylesGenerator<T, C> = (theme: MakeStylesProps, styleContext: C) => T;

export const useMakeStyles = <T extends object, C extends object>(
  makeStyles: MakeStylesGenerator<T, C>,
  styleContext?: C,
) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const layout = useLayout();

  return useMemo(
    () => makeStyles({ ...theme, ...layout, insets }, styleContext ?? ({} as any)),
    [makeStyles, theme, insets, layout, styleContext],
  );
};
