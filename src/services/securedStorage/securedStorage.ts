import * as Keychain from 'react-native-keychain';

export enum SecuredStorageKey {
  s3AccessToken = 's3AccessToken',
}

/**
 * Service to store sensitive data securely.
 * Currently uses `react-native-keychain` under the hood.
 * The implementation is abstracted so it can be replaced easily in the future.
 */
export class SecuredStorage {
  /**
   * Available keys for the secured storage.
   */
  static readonly keys = SecuredStorageKey;

  /**
   * Sets a sensitive string value into the secured storage.
   *
   * @param key The key to store the value under.
   * @param value The sensitive string to store.
   */
  static async setItem(key: SecuredStorageKey, value: string): Promise<void> {
    try {
      // We use the key as both the username and the service identifier
      // to allow storing multiple independent key-value pairs in the keychain.
      await Keychain.setGenericPassword(key, value, {
        service: key,
      });
    } catch (error) {
      console.error(`SecuredStorage: Error setting item for key ${key}`, error);
      throw error;
    }
  }

  /**
   * Reads a sensitive string value from the secured storage.
   *
   * @param key The key to read the value for.
   * @returns The stored string value, or null if not found or on error.
   */
  static async getItem(key: SecuredStorageKey): Promise<string | null> {
    try {
      const result = await Keychain.getGenericPassword({ service: key });
      if (result) {
        return result.password;
      }
      return null;
    } catch (error) {
      console.error(`SecuredStorage: Error getting item for key ${key}`, error);
      return null;
    }
  }

  /**
   * Removes a sensitive value from the secured storage.
   *
   * @param key The key to remove the value for.
   */
  static async removeItem(key: SecuredStorageKey): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service: key });
    } catch (error) {
      console.error(`SecuredStorage: Error removing item for key ${key}`, error);
      throw error;
    }
  }
}
