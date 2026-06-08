import { act, renderHook } from '@testing-library/react-native';
import { adapty } from 'react-native-adapty';

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
  });

  it('ensureAdaptyActivated calls adapty.activate when not activated', async () => {
    await ensureAdaptyActivated();

    expect(adapty.isActivated).toHaveBeenCalled();
    expect(adapty.activate).toHaveBeenCalledTimes(1);
  });

  it('ensureAdaptyActivated skips activate when already activated', async () => {
    (adapty.isActivated as jest.Mock).mockResolvedValue(true);

    await ensureAdaptyActivated();

    expect(adapty.activate).not.toHaveBeenCalled();
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
