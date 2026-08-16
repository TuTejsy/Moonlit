import {
  activate,
  ensureInitialized,
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
  getString,
  onConfigUpdate,
  type ConfigUpdate,
  type RemoteConfig,
} from '@react-native-firebase/remote-config';

import { remoteConfigDefaultValues, REMOTE_CONFIG_FIELDS } from './remoteConfig.constants';

// First-launch iOS Analytics can take >60s to answer RC's user-property
// callback; the SDK default timeout then surfaces as [remoteConfig/failure].
const FETCH_TIMEOUT_MS = 180_000;
const PRODUCTION_MINIMUM_FETCH_INTERVAL_MS = 12 * 60 * 60 * 1000;

type RemoteConfigNativeMutations = RemoteConfig & {
  setConfigSettings: (settings: {
    fetchTimeoutMillis: number;
    minimumFetchIntervalMillis: number;
  }) => Promise<void>;
  setDefaults: (defaults: typeof remoteConfigDefaultValues) => Promise<null>;
};

class RemoteConfigService {
  private config: RemoteConfigNativeMutations = getRemoteConfig() as RemoteConfigNativeMutations;

  private nativeReady: Promise<void> | null = null;

  private remoteConfigListenerUnsubscriber: (() => void) | null = null;

  constructor() {
    this.config.defaultConfig = remoteConfigDefaultValues;
  }

  private async initializeNativeConfig(): Promise<void> {
    await this.config.setConfigSettings({
      fetchTimeoutMillis: FETCH_TIMEOUT_MS,
      minimumFetchIntervalMillis: __DEV__ ? 0 : PRODUCTION_MINIMUM_FETCH_INTERVAL_MS,
    });
    await this.config.setDefaults(remoteConfigDefaultValues);
    await ensureInitialized(this.config);
  }

  private ensureNativeConfigReady(): Promise<void> {
    if (!this.nativeReady) {
      this.nativeReady = this.initializeNativeConfig().catch((error: unknown) => {
        this.nativeReady = null;
        throw error;
      });
    }

    return this.nativeReady;
  }

  async fetchAndActivate() {
    await this.ensureNativeConfigReady();
    return fetchAndActivate(this.config);
  }

  enableLiveUpdate = () => {
    this.remoteConfigListenerUnsubscriber = onConfigUpdate(this.config, {
      complete: () => undefined,
      error: (error) => {
        console.log(`remote-config listener subscription error: ${JSON.stringify(error)}`);
      },
      next: (event: ConfigUpdate) => {
        // Updated keys are keys that are added, removed, or changed value, metadata, or source
        // Note: A key is considered updated if it is different then the activated config.
        //       If the new config is never activated, the same keys will remain in the set of
        //       of updated keys passed to the callback on every config update
        console.log(`remote-config updated keys: ${JSON.stringify([...event.getUpdatedKeys()])}`);

        // If you use realtime updates, the SDK fetches the new config for you.
        // However, you must activate the new config so it is in effect
        activate(this.config).catch((activateError: unknown) => {
          console.log(`remote-config activate error: ${JSON.stringify(activateError)}`);
        });
      },
    });
  };

  disableLiveUpdate = () => {
    this.remoteConfigListenerUnsubscriber?.();
  };

  get isLiveUpdateEnabled() {
    return !!this.remoteConfigListenerUnsubscriber;
  }

  get toggleState() {
    return (
      getBoolean(this.config, REMOTE_CONFIG_FIELDS.TOGGLE_STATE) ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.TOGGLE_STATE]
    );
  }

  get buyButtonTextTrial() {
    return (
      getString(this.config, REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL) ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL]
    );
  }

  get buyButtonTextNoTrial() {
    return (
      getString(this.config, REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL) ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL]
    );
  }

  get segment() {
    return (
      getString(this.config, REMOTE_CONFIG_FIELDS.SEGMENT) ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.SEGMENT]
    );
  }
}

export const remoteConfigService = new RemoteConfigService();
