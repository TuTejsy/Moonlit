import { TurboModule, TurboModuleRegistry } from 'react-native';

import { IS_IOS } from '@/constants/common';

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

export const ShareIOS = IS_IOS ? TurboModuleRegistry.get<Spec>('MNTShareManager') : undefined;
