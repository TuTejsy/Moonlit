import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

export const reduxMMKVStorage = new MMKV({
  encryptionKey: 'PRX7ueXKiUA+QaVmSy/xmD/Bwq5WlXsRu8DLecxG8LQ=s',
  id: 'redux-persist-storage',
});

export const reduxPersistStorage: Storage = {
  getItem: (key) => {
    const value = reduxMMKVStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    reduxMMKVStorage.delete(key);
    return Promise.resolve();
  },
  setItem: (key, value) => {
    reduxMMKVStorage.set(key, value);
    return Promise.resolve(true);
  },
};
