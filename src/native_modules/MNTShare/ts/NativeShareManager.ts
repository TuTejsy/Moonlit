import { TurboModule, TurboModuleRegistry } from 'react-native';

interface ShareOptions {
  message?: string;
  subtitle?: string;
  tintColor?: string;
  title?: string;
  url?: string;
  userInterfaceStyle?: 'dark' | 'light';
}

export interface Spec extends TurboModule {
  share: (options: ShareOptions) => void;
}

export const Share = TurboModuleRegistry.get<Spec>('MNTShareManager');
