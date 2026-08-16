import { AppState, AppStateStatus } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { useAppState } from '../useAppState';

jest.unmock('@/hooks/useAppState');

jest.mock('react-native', () => ({
  AppState: {
    addEventListener: jest.fn(),
    currentState: 'active',
  },
  Platform: {
    OS: 'ios',
  },
}));

jest.mock('@/constants/common', () => ({
  IS_ANDROID: false,
}));

describe('useAppState', () => {
  let callbacks: Record<string, (state: AppStateStatus) => void>;
  let removeChangeMock: jest.Mock;

  beforeEach(() => {
    callbacks = {};
    removeChangeMock = jest.fn();
    (AppState.addEventListener as jest.Mock).mockClear();

    (AppState.addEventListener as jest.Mock).mockImplementation((event: string, cb: any) => {
      callbacks[event] = cb;
      removeChangeMock = jest.fn();
      return { remove: removeChangeMock };
    });
  });

  it('initializes with current AppState', async () => {
    const { result } = await renderHook(() => useAppState({}));

    expect(result.current).toBe('active');
  });

  it('calls onActive when app state changes to active', async () => {
    const onActive = jest.fn();
    await renderHook(() => useAppState({ onActive }));

    callbacks.change('active');

    expect(onActive).toHaveBeenCalledTimes(1);
  });

  it('calls onBackground when app state changes to background', async () => {
    const onBackground = jest.fn();
    await renderHook(() => useAppState({ onBackground }));

    callbacks.change('background');

    expect(onBackground).toHaveBeenCalledTimes(1);
  });

  it('calls onInactive when app state changes to inactive', async () => {
    const onInactive = jest.fn();
    await renderHook(() => useAppState({ onInactive }));

    callbacks.change('inactive');

    expect(onInactive).toHaveBeenCalledTimes(1);
  });

  it('removes change listener on unmount', async () => {
    const { unmount } = await renderHook(() => useAppState({ onActive: jest.fn() }));

    await unmount();

    expect(removeChangeMock).toHaveBeenCalled();
  });
});
