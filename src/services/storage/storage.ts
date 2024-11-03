import { MMKV } from 'react-native-mmkv';

import { StorageKeys } from './storage.constants';
import { STORAGE_ENCRYPTION_KEY } from '@/constants/auth';

export const storage = new MMKV({
  encryptionKey: STORAGE_ENCRYPTION_KEY,
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
  const isAnaltyticsEnabled = devMode
    ? storage.getBoolean(StorageKeys.isAnaltyticsEnabled) ?? false
    : true;

  const isRemoteConfigLiveUpdateEnabled = devMode
    ? storage.getBoolean(StorageKeys.isRemoteConfigLiveUpdateEnabled) ?? false
    : false;

  const isOnboarded = storage.getBoolean(StorageKeys.isOnboarded);
  const isFirstLaunch = storage.getBoolean(StorageKeys.isFirstLaunch) ?? true;
  const isReviewAsked = storage.getBoolean(StorageKeys.isReviewAsked) ?? false;

  return {
    [StorageKeys.DevMode]: devMode,
    [StorageKeys.isOnboarded]: isOnboarded,
    [StorageKeys.isFirstLaunch]: isFirstLaunch,
    [StorageKeys.isReviewAsked]: isReviewAsked,
    [StorageKeys.isAnaltyticsEnabled]: isAnaltyticsEnabled,
    [StorageKeys.isRemoteConfigLiveUpdateEnabled]: isRemoteConfigLiveUpdateEnabled,
  };
};

export type StorageData = ReturnType<typeof getStorageData>;
