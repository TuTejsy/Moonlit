import type { StyleProp, ViewStyle } from 'react-native';

export interface ProdCtaButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
