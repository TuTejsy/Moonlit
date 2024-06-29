import remoteConfig from '@react-native-firebase/remote-config';

import { remoteConfigDefaultValues, REMOTE_CONFIG_FIELDS } from './remoteConfig.constants';

class RemoteConfigService {
  constructor() {
    remoteConfig().setDefaults(remoteConfigDefaultValues);
    remoteConfig().fetchAndActivate();
  }

  static get toggleState() {
    return remoteConfig().getValue(REMOTE_CONFIG_FIELDS.TOGGLE_STATE).asBoolean();
  }

  static get placementId() {
    return remoteConfig().getValue(REMOTE_CONFIG_FIELDS.PLACEMENT_ID).asString();
  }

  static get buyButtonTextTrial() {
    return remoteConfig().getValue(REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL).asString();
  }

  static get buyButtonTextNoTrial() {
    return remoteConfig().getValue(REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL).asString();
  }
}

export const remoteConfigService = new RemoteConfigService();
