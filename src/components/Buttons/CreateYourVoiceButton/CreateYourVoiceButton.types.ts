import { ViewProps } from 'react-native';

export type CreateYourVoiceButtonVariant = 'compact' | 'default';

export interface CreateYourVoiceButtonProps extends ViewProps {
  onPress: () => void;
  variant?: CreateYourVoiceButtonVariant;
}
