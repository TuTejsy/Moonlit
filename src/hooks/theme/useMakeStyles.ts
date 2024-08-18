import { useMemo } from 'react';

import { useSafeAreaInsets, WithSafeAreaInsetsProps } from 'react-native-safe-area-context';

import { Layout, useLayout } from './useLayout';
import { useRelativeSize } from './useRelativeSize';
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
  const { dh, dw } = useRelativeSize();

  return useMemo(
    () => makeStyles({ ...theme, ...layout, dh, dw, insets }, styleContext ?? ({} as any)),
    [makeStyles, theme, dh, dw, insets, layout, styleContext],
  );
};
