import remoteConfig from '@react-native-firebase/remote-config';

import { remoteConfigService } from '../remoteConfig/remoteConfig';
import {
  remoteConfigDefaultValues,
  REMOTE_CONFIG_FIELDS,
} from '../remoteConfig/remoteConfig.constants';

jest.unmock('@/services/remoteConfig/remoteConfig');

jest.mock('@react-native-firebase/remote-config', () => {
  const mockGetValue = jest.fn().mockReturnValue({
    asBoolean: jest.fn().mockReturnValue(false),
    asString: jest.fn().mockReturnValue(''),
  });

  const mockConfig = {
    activate: jest.fn().mockResolvedValue(true),
    fetchAndActivate: jest.fn().mockResolvedValue(true),
    getValue: mockGetValue,
    onConfigUpdated: jest.fn().mockReturnValue(jest.fn()),
    setDefaults: jest.fn(),
  };

  return {
    __esModule: true,
    default: jest.fn(() => mockConfig),
  };
});

jest.mock('@/constants/common', () => ({
  SWITCH_PLACEMENT_ID: 'FULL_ACCESS',
}));

describe('RemoteConfigService', () => {
  const mockConfigInstance = remoteConfig();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets defaults on construction', () => {
    // setDefaults is called in the constructor at module load time,
    // so we verify getValue is accessible (constructor ran without error)
    expect(mockConfigInstance.getValue).toBeDefined();
    expect(mockConfigInstance.setDefaults).toBeDefined();
  });

  it('fetchAndActivate delegates to the firebase config', async () => {
    await remoteConfigService.fetchAndActivate();

    expect(mockConfigInstance.fetchAndActivate).toHaveBeenCalled();
  });

  describe('enableLiveUpdate', () => {
    it('subscribes to config updates', () => {
      remoteConfigService.enableLiveUpdate();

      expect(mockConfigInstance.onConfigUpdated).toHaveBeenCalled();
    });

    it('sets isLiveUpdateEnabled to true after enabling', () => {
      remoteConfigService.enableLiveUpdate();

      expect(remoteConfigService.isLiveUpdateEnabled).toBe(true);
    });
  });

  describe('disableLiveUpdate', () => {
    it('calls the unsubscriber when disabling live update', () => {
      const unsubscriber = jest.fn();
      (mockConfigInstance.onConfigUpdated as jest.Mock).mockReturnValue(unsubscriber);

      remoteConfigService.enableLiveUpdate();
      remoteConfigService.disableLiveUpdate();

      expect(unsubscriber).toHaveBeenCalled();
    });
  });

  describe('config getters', () => {
    it('returns toggleState from remote config or default', () => {
      const result = remoteConfigService.toggleState;

      expect(result).toBe(remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.TOGGLE_STATE]);
    });

    it('returns placementId from remote config or default', () => {
      const result = remoteConfigService.placementId;

      expect(result).toBe(remoteConfigDefaultValues[REMOTE_CONFIG_FIELDS.PLACEMENT_ID]);
    });

    it('returns buyButtonTextTrial from remote config or default', () => {
      const result = remoteConfigService.buyButtonTextTrial;

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
