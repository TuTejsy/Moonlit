import { MMKV } from 'react-native-mmkv';

import { StorageKeys } from './storage.constants';

export const storage = new MMKV({
  encryptionKey: 'H632SPS6VNSFE24',
  id: `app-storage`,
});

type StorageDataReturn = { [key in StorageKeys]: number | string | boolean | undefined };

const initialIsFirstLaunch = storage.getBoolean(StorageKeys.isFirstLaunch);

if (initialIsFirstLaunch === undefined) {
  storage.set(StorageKeys.isFirstLaunch, true);
} else if (initialIsFirstLaunch) {
  storage.set(StorageKeys.isFirstLaunch, false);
}

export const getStorageData = (): StorageDataReturn => {
  const devMode = storage.getBoolean(StorageKeys.DevMode);
  const isOnboarded = storage.getBoolean(StorageKeys.isOnboarded);
  const isFirstLaunch = storage.getBoolean(StorageKeys.isFirstLaunch) ?? true;

  return {
    [StorageKeys.DevMode]: devMode,
    [StorageKeys.isOnboarded]: isOnboarded,
    [StorageKeys.isFirstLaunch]: isFirstLaunch,
  };
};

export type StorageData = ReturnType<typeof getStorageData>;
