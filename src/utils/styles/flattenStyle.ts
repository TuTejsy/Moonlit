import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type StyleInput<T> = T | false | null | undefined;

function isDefinedStyle<T>(style: StyleInput<T>): style is T {
  return style !== false && style !== null && style !== undefined;
}

export function flattenStyle<T extends ViewStyle | TextStyle | ImageStyle>(
  styles: Array<StyleInput<T>>,
): T {
  const defined = styles.filter(isDefinedStyle);

  return (StyleSheet.flatten(defined) ?? {}) as T;
}
