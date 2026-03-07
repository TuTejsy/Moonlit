import { storage, getStorageData } from '../storage/storage';
import { StorageKeys } from '../storage/storage.constants';

jest.unmock('@/services/storage/storage');

jest.mock('react-native-mmkv', () => {
  const store: Record<string, string | boolean | number> = {};

  return {
    createMMKV: jest.fn(() => ({
      getBoolean: jest.fn((key: string) => {
        const val = store[key];
        return typeof val === 'boolean' ? val : undefined;
      }),
      getString: jest.fn((key: string) => {
        const val = store[key];
        return typeof val === 'string' ? val : undefined;
      }),
      set: jest.fn((key: string, value: string | boolean | number) => {
        store[key] = value;
      }),
    })),
  };
});

jest.mock('@/constants/auth', () => ({
  STORAGE_ENCRYPTION_KEY: 'test-key',
}));

describe('storage', () => {
  it('exports a storage instance', () => {
    expect(storage).toBeDefined();
    expect(storage.set).toBeDefined();
    expect(storage.getBoolean).toBeDefined();
  });
});

describe('getStorageData', () => {
  it('returns an object with all expected StorageKeys', () => {
    const data = getStorageData();

    expect(data).toHaveProperty(StorageKeys.DevMode);
    expect(data).toHaveProperty(StorageKeys.isOnboarded);
    expect(data).toHaveProperty(StorageKeys.isFirstLaunch);
    expect(data).toHaveProperty(StorageKeys.isReviewAsked);
    expect(data).toHaveProperty(StorageKeys.isAnaltyticsEnabled);
    expect(data).toHaveProperty(StorageKeys.isRemoteConfigLiveUpdateEnabled);
  });

  it('returns isReviewAsked as false by default', () => {
    const data = getStorageData();

    expect(data[StorageKeys.isReviewAsked]).toBe(false);
  });

  it('returns isRemoteConfigLiveUpdateEnabled as false when devMode is not set', () => {
    const data = getStorageData();

    expect(data[StorageKeys.isRemoteConfigLiveUpdateEnabled]).toBe(false);
  });
});
