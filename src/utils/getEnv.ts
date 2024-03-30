import Config from 'react-native-config';

import { getStorageData } from '@/services/storage/storage';

export const getApplicationEnv = () => {
  const { devMode } = getStorageData();

  if (!devMode) {
    return Config.APPLICATION_ENV;
  }

  return 'sandbox';
};
