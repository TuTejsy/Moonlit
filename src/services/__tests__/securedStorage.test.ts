import * as Keychain from 'react-native-keychain';

import { SecuredStorage, SecuredStorageKey } from '../securedStorage/securedStorage';

describe('SecuredStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setItem', () => {
    it('should call Keychain.setGenericPassword with correct parameters', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;
      const mockValue = 'test-token';

      await SecuredStorage.setItem(mockKey, mockValue);

      expect(Keychain.setGenericPassword).toHaveBeenCalledTimes(1);
      expect(Keychain.setGenericPassword).toHaveBeenCalledWith(mockKey, mockValue, {
        service: mockKey,
      });
    });

    it('should throw an error if Keychain.setGenericPassword fails', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;
      const mockValue = 'test-token';
      const mockError = new Error('Keychain set failed');

      jest.spyOn(Keychain, 'setGenericPassword').mockRejectedValueOnce(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(SecuredStorage.setItem(mockKey, mockValue)).rejects.toThrow(mockError);

      expect(consoleSpy).toHaveBeenCalledWith(
        `SecuredStorage: Error setting item for key ${mockKey}`,
        mockError,
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getItem', () => {
    it('should call Keychain.getGenericPassword with correct parameters and return password when successful', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;
      const mockToken = 'test-token';
      const mockResult = {
        password: mockToken,
        service: mockKey,
        storage: 'keychain',
        username: mockKey,
      } as unknown as Keychain.UserCredentials;

      jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(mockResult);

      const result = await SecuredStorage.getItem(mockKey);

      expect(Keychain.getGenericPassword).toHaveBeenCalledTimes(1);
      expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
        service: mockKey,
      });
      expect(result).toBe(mockToken);
    });

    it('should return null if Keychain.getGenericPassword returns false (not found)', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;

      jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(false);

      const result = await SecuredStorage.getItem(mockKey);

      expect(result).toBeNull();
    });

    it('should return null and log error if Keychain.getGenericPassword fails', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;
      const mockError = new Error('Keychain get failed');

      jest.spyOn(Keychain, 'getGenericPassword').mockRejectedValueOnce(mockError);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await SecuredStorage.getItem(mockKey);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        `SecuredStorage: Error getting item for key ${mockKey}`,
        mockError,
      );

      consoleSpy.mockRestore();
    });
  });

  describe('removeItem', () => {
    it('should call Keychain.resetGenericPassword with correct parameters', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;

      await SecuredStorage.removeItem(mockKey);

      expect(Keychain.resetGenericPassword).toHaveBeenCalledTimes(1);
      expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
        service: mockKey,
      });
    });

    it('should throw an error if Keychain.resetGenericPassword fails', async () => {
      const mockKey = SecuredStorageKey.s3AccessToken;
      const mockError = new Error('Keychain reset failed');

      jest.spyOn(Keychain, 'resetGenericPassword').mockRejectedValueOnce(mockError);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(SecuredStorage.removeItem(mockKey)).rejects.toThrow(mockError);

      expect(consoleSpy).toHaveBeenCalledWith(
        `SecuredStorage: Error removing item for key ${mockKey}`,
        mockError,
      );

      consoleSpy.mockRestore();
    });
  });
});
