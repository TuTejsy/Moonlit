import { act, renderHook } from '@testing-library/react-native';
import { adapty } from 'react-native-adapty';

import { isDevMode } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AnalyticsService } from '@/services/analytics/analytics';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { lockFullVersion, unlockFullVersion } from '@/store/user/user.slice';

import { useAppSelector } from '../useAppSelector';
import { useHandleCheckSubscription } from '../useHandleCheckSubscription';

jest.unmock('@/hooks/useHandleCheckSubscription');

jest.mock('@/constants/common', () => ({
  isDevMode: jest.fn(),
}));

jest.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/store/user/user.selector', () => ({
  selectIsFullVersion: jest.fn(),
}));

jest.mock('@/store/user/user.slice', () => ({
  lockFullVersion: jest.fn().mockReturnValue('lock-action'),
  unlockFullVersion: jest.fn().mockReturnValue('unlock-action'),
}));

describe('useHandleCheckSubscription', () => {
  const dispatchMock = jest.fn();
  let onSuccessMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    onSuccessMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  it('calls onSuccess immediately with isFullAccess when in dev mode', () => {
    (isDevMode as jest.Mock).mockReturnValue(true);
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectIsFullVersion) {
        return true;
      }
      return false;
    });

    const { result } = renderHook(() => useHandleCheckSubscription(onSuccessMock));

    act(() => {
      result.current();
    });

    expect(onSuccessMock).toHaveBeenCalledWith(true);
    expect(adapty.getProfile).not.toHaveBeenCalled();
  });

  it('fetches profile and unlocks version if premium is active', async () => {
    (isDevMode as jest.Mock).mockReturnValue(false);
    (useAppSelector as jest.Mock).mockReturnValue(false);

    (adapty.getProfile as jest.Mock).mockResolvedValue({
      accessLevels: {
        premium: { isActive: true },
      },
    });

    const { result } = renderHook(() => useHandleCheckSubscription(onSuccessMock));

    await act(async () => {
      result.current();
    });

    expect(adapty.getProfile).toHaveBeenCalled();
    expect(AnalyticsService.setIsUserPaid).toHaveBeenCalledWith(true);
    expect(unlockFullVersion).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith('unlock-action');
    expect(onSuccessMock).toHaveBeenCalledWith(true);
  });

  it('fetches profile and locks version if premium is inactive', async () => {
    (isDevMode as jest.Mock).mockReturnValue(false);
    (useAppSelector as jest.Mock).mockReturnValue(true);

    (adapty.getProfile as jest.Mock).mockResolvedValue({
      accessLevels: {
        premium: { isActive: false },
      },
    });

    const { result } = renderHook(() => useHandleCheckSubscription(onSuccessMock));

    await act(async () => {
      result.current();
    });

    expect(adapty.getProfile).toHaveBeenCalled();
    expect(AnalyticsService.setIsUserPaid).toHaveBeenCalledWith(false);
    expect(lockFullVersion).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith('lock-action');
    expect(onSuccessMock).toHaveBeenCalledWith(false);
  });
});
