import { act, renderHook } from '@testing-library/react-native';

import { AnalyticsService } from '@/services/analytics/analytics';
import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';

import {
  ensureRemoteConfigFetched,
  resetRemoteConfigInitStateForTests,
  useRemoteConfigInit,
} from '../useRemoteConfigInit';

jest.mock('@/services/remoteConfig/remoteConfig', () => ({
  remoteConfigService: {
    fetchAndActivate: jest.fn().mockResolvedValue(true),
  },
}));

describe('useRemoteConfigInit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetRemoteConfigInitStateForTests();
  });

  it('calls fetchAndActivate once on mount', async () => {
    await renderHook(() => useRemoteConfigInit());

    await act(async () => {
      await Promise.resolve();
    });

    expect(AnalyticsService.warmUpNativeSdk).toHaveBeenCalledTimes(1);
    expect(remoteConfigService.fetchAndActivate).toHaveBeenCalledTimes(1);
  });

  it('deduplicates concurrent fetch requests via ensureRemoteConfigFetched', async () => {
    await Promise.all([ensureRemoteConfigFetched(), ensureRemoteConfigFetched()]);

    expect(remoteConfigService.fetchAndActivate).toHaveBeenCalledTimes(1);
  });
});
