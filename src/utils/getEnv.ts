import { getStorageData } from '@/services/storage/storage';

export const getApplicationEnv = () => {
  const { devMode } = getStorageData();

  return devMode ? 'dev' : 'prod';
};
