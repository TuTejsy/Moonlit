import { MMKV } from 'react-native-mmkv';

import { StorageKeys } from './storage.constants';

export const storage = new MMKV({
  encryptionKey: 'H632SPS6VNSFE24',
  id: `app-storage`,
});

type StorageDataReturn = { [key in StorageKeys]: number | string | boolean | undefined };

export const getStorageData = (): StorageDataReturn => {
  const devMode = storage.getBoolean(StorageKeys.DevMode);

  return {
    [StorageKeys.DevMode]: devMode,
  };
};

export type StorageData = ReturnType<typeof getStorageData>;
