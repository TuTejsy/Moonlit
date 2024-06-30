import remoteConfig from '@react-native-firebase/remote-config';

import { remoteConfigDefaultValues, REMOTE_CONFIG_FIELDS } from './remoteConfig.constants';

class RemoteConfigService {
  private config = remoteConfig();

  constructor() {
    this.config.setDefaults(remoteConfigDefaultValues);
    this.config.fetchAndActivate();
  }

  get toggleState() {
    return this.config.getValue(REMOTE_CONFIG_FIELDS.TOGGLE_STATE).asBoolean();
  }

  get placementId() {
    return this.config.getValue(REMOTE_CONFIG_FIELDS.PLACEMENT_ID).asString();
  }

  get buyButtonTextTrial() {
    return this.config.getValue(REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL).asString();
  }

  get buyButtonTextNoTrial() {
    return this.config.getValue(REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL).asString();
  }

  get segment() {
    return this.config.getValue(REMOTE_CONFIG_FIELDS.SEGMENT).asString();
  }
}

export const remoteConfigService = new RemoteConfigService();
