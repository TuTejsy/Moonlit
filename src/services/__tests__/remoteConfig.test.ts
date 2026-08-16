import {
  ensureInitialized,
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
  getString,
  onConfigUpdate,
} from '@react-native-firebase/remote-config';

import { remoteConfigService } from '../remoteConfig/remoteConfig';
import {
  remoteConfigDefaultValues,
  REMOTE_CONFIG_FIELDS,
} from '../remoteConfig/remoteConfig.constants';

jest.unmock('@/services/remoteConfig/remoteConfig');

type MockRemoteConfig = {
  defaultConfig: Record<string, string | number | boolean>;
  setConfigSettings: jest.Mock;
  setDefaults: jest.Mock;
};

jest.mock('@react-native-firebase/remote-config', () => {
  const mockConfig = {
    defaultConfig: {},
    setConfigSettings: jest.fn().mockResolvedValue(undefined),
    setDefaults: jest.fn().mockResolvedValue(null),
  };

  return {
    activate: jest.fn().mockResolvedValue(true),
    ensureInitialized: jest.fn().mockResolvedValue(undefined),
    fetchAndActivate: jest.fn().mockResolvedValue(true),
    getBoolean: jest.fn().mockReturnValue(false),
    getRemoteConfig: jest.fn(() => mockConfig),
    getString: jest.fn().mockReturnValue(''),
    onConfigUpdate: jest.fn().mockReturnValue(jest.fn()),
  };
});

describe('RemoteConfigService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets defaults on construction', () => {
    const mockConfigInstance = getRemoteConfig();

    expect(mockConfigInstance.defaultConfig).toEqual(remoteConfigDefaultValues);
  });

  it('waits for native settings, defaults, and ensureInitialized before fetch', async () => {
    await remoteConfigService.fetchAndActivate();

    const mockConfigInstance = getRemoteConfig() as unknown as MockRemoteConfig;

    expect(mockConfigInstance.setConfigSettings).toHaveBeenCalledWith({
      fetchTimeoutMillis: 180_000,
      minimumFetchIntervalMillis: 0,
    });
    expect(mockConfigInstance.setDefaults).toHaveBeenCalledWith(remoteConfigDefaultValues);
    expect(ensureInitialized).toHaveBeenCalledWith(mockConfigInstance);
    expect(fetchAndActivate).toHaveBeenCalledWith(mockConfigInstance);
  });

  describe('enableLiveUpdate', () => {
    it('subscribes to config updates', () => {
      remoteConfigService.enableLiveUpdate();

      expect(onConfigUpdate).toHaveBeenCalled();
    });

    it('sets isLiveUpdateEnabled to true after enabling', () => {
      remoteConfigService.enableLiveUpdate();

      expect(remoteConfigService.isLiveUpdateEnabled).toBe(true);
    });
  });

  describe('disableLiveUpdate', () => {
    it('calls the unsubscriber when disabling live update', () => {
      const unsubscriber = jest.fn();
      (onConfigUpdate as jest.Mock).mockReturnValue(unsubscriber);

      remoteConfigService.enableLiveUpdate();
      remoteConfigService.disableLiveUpdate();

      expect(unsubscriber).toHaveBeenCalled();
    });
  });

  describe('config getters', () => {
    it('returns toggleState from remote config or default', () => {
      const result = remoteConfigService.toggleState;

      expect(getBoolean).toHaveBeenCalledWith(getRemoteConfig(), REMOTE_CONFIG_FIELDS.TOGGLE_STATE);
      expect(result).toBe(remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.TOGGLE_STATE]);
    });

    it('returns buyButtonTextTrial from remote config or default', () => {
      const result = remoteConfigService.buyButtonTextTrial;

      expect(getString).toHaveBeenCalledWith(
        getRemoteConfig(),
        REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL,
      );
      expect(result).toBe(remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL]);
    });

    it('returns buyButtonTextNoTrial from remote config or default', () => {
      const result = remoteConfigService.buyButtonTextNoTrial;

      expect(result).toBe(remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL]);
    });

    it('returns segment from remote config or default', () => {
      const result = remoteConfigService.segment;

      expect(result).toBe(remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.SEGMENT]);
    });
  });
});
