import { createMMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

import { REDUX_STORAGE_ENCRYPTION_KEY } from '@/constants/auth';

export const reduxMMKVStorage = createMMKV({
  encryptionKey: REDUX_STORAGE_ENCRYPTION_KEY,
  id: 'redux-persist-storage',
});

export const reduxPersistStorage: Storage = {
  getItem: (key) => {
    const value = reduxMMKVStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    reduxMMKVStorage.remove(key);
    return Promise.resolve();
  },
  setItem: (key, value) => {
    reduxMMKVStorage.set(key, value);
    return Promise.resolve(true);
  },
};
