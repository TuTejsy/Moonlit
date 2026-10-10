import { act, renderHook } from '@testing-library/react-native';
import { adapty } from 'react-native-adapty';

import { AnalyticsService } from '@/services/analytics/analytics';

import {
  ensureAdaptyActivated,
  resetAdaptyInitStateForTests,
  useAdaptyInit,
} from '../useAdaptyInit';

describe('useAdaptyInit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetAdaptyInitStateForTests();
    (adapty.isActivated as jest.Mock).mockResolvedValue(false);
    (adapty.activate as jest.Mock).mockResolvedValue(undefined);
    (adapty.setIntegrationIdentifier as jest.Mock).mockResolvedValue(undefined);
    (AnalyticsService.getMixpanelDistinctId as jest.Mock).mockResolvedValue('mixpanel-distinct-id');
  });

  it('ensureAdaptyActivated calls adapty.activate when not activated', async () => {
    await ensureAdaptyActivated();

    expect(adapty.isActivated).toHaveBeenCalled();
    expect(adapty.activate).toHaveBeenCalledTimes(1);
    expect(adapty.setIntegrationIdentifier).toHaveBeenCalledWith(
      'mixpanel_user_id',
      'mixpanel-distinct-id',
    );
  });

  it('ensureAdaptyActivated skips activate when already activated', async () => {
    (adapty.isActivated as jest.Mock).mockResolvedValue(true);

    await ensureAdaptyActivated();

    expect(adapty.activate).not.toHaveBeenCalled();
    expect(adapty.setIntegrationIdentifier).not.toHaveBeenCalled();
  });

  it('ensureAdaptyActivated skips the Mixpanel id when distinct id is missing', async () => {
    (AnalyticsService.getMixpanelDistinctId as jest.Mock).mockResolvedValue(null);

    await ensureAdaptyActivated();

    expect(adapty.activate).toHaveBeenCalledTimes(1);
    expect(adapty.setIntegrationIdentifier).not.toHaveBeenCalled();
  });

  it('ensureAdaptyActivated still resolves when setting the Mixpanel id fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    (adapty.setIntegrationIdentifier as jest.Mock).mockRejectedValue(
      new Error('mixpanel id failed'),
    );

    await expect(ensureAdaptyActivated()).resolves.toBeUndefined();
    expect(adapty.activate).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('ensureAdaptyActivated deduplicates concurrent activation calls', async () => {
    await Promise.all([ensureAdaptyActivated(), ensureAdaptyActivated()]);

    expect(adapty.activate).toHaveBeenCalledTimes(1);
  });

  it('useAdaptyInit triggers activation once on mount', async () => {
    await renderHook(() => useAdaptyInit());

    await act(async () => {
      await Promise.resolve();
    });

    expect(adapty.activate).toHaveBeenCalledTimes(1);
  });
});
