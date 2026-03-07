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
    removeChangeMock = jest.Mock;
    (AppState.addEventListener as jest.Mock).mockClear();

    (AppState.addEventListener as jest.Mock).mockImplementation((event: string, cb: any) => {
      callbacks[event] = cb;
      removeChangeMock = jest.fn();
      return { remove: removeChangeMock };
    });
  });

  it('initializes with current AppState', () => {
    const { result } = renderHook(() => useAppState({}));

    expect(result.current).toBe('active');
  });

  it('calls onActive when app state changes to active', () => {
    const onActive = jest.fn();
    renderHook(() => useAppState({ onActive }));

    callbacks.change('active');

    expect(onActive).toHaveBeenCalledTimes(1);
  });

  it('calls onBackground when app state changes to background', () => {
    const onBackground = jest.fn();
    renderHook(() => useAppState({ onBackground }));

    callbacks.change('background');

    expect(onBackground).toHaveBeenCalledTimes(1);
  });

  it('calls onInactive when app state changes to inactive', () => {
    const onInactive = jest.fn();
    renderHook(() => useAppState({ onInactive }));

    callbacks.change('inactive');

    expect(onInactive).toHaveBeenCalledTimes(1);
  });

  it('removes change listener on unmount', () => {
    const { unmount } = renderHook(() => useAppState({ onActive: jest.fn() }));

    unmount();

    expect(removeChangeMock).toHaveBeenCalled();
  });
});
