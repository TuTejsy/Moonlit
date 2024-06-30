import remoteConfig from '@react-native-firebase/remote-config';

import { remoteConfigDefaultValues, REMOTE_CONFIG_FIELDS } from './remoteConfig.constants';

class RemoteConfigService {
  private config = remoteConfig();

  private remoteConfigListenerUnsubscriber: (() => void) | null = null;

  constructor() {
    this.config.setDefaults(remoteConfigDefaultValues);
  }

  fetchAndActivate() {
    return this.config.fetchAndActivate();
  }

  enableLiveUpdate = () => {
    this.remoteConfigListenerUnsubscriber = this.config.onConfigUpdated((event, error) => {
      if (error !== undefined) {
        console.log(`remote-config listener subscription error: ${JSON.stringify(error)}`);
      } else {
        // Updated keys are keys that are added, removed, or changed value, metadata, or source
        // Note: A key is considered updated if it is different then the activated config.
        //       If the new config is never activated, the same keys will remain in the set of
        //       of updated keys passed to the callback on every config update
        console.log(`remote-config updated keys: ${JSON.stringify(event)}`);

        // If you use realtime updates, the SDK fetches the new config for you.
        // However, you must activate the new config so it is in effect
        remoteConfig().activate();
      }
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
      this.config.getValue(REMOTE_CONFIG_FIELDS.TOGGLE_STATE).asBoolean() ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.TOGGLE_STATE]
    );
  }

  get placementId() {
    return (
      this.config.getValue(REMOTE_CONFIG_FIELDS.PLACEMENT_ID).asString() ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.PLACEMENT_ID]
    );
  }

  get buyButtonTextTrial() {
    return (
      this.config.getValue(REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL).asString() ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL]
    );
  }

  get buyButtonTextNoTrial() {
    return (
      this.config.getValue(REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL).asString() ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL]
    );
  }

  get segment() {
    return (
      this.config.getValue(REMOTE_CONFIG_FIELDS.SEGMENT).asString() ||
      remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.SEGMENT]
    );
  }
}

export const remoteConfigService = new RemoteConfigService();
