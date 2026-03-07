import { BackHandler } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { renderHook } from '@testing-library/react-native';

import { useBackHandler } from '@/hooks/navigation/useBackHandler';

jest.unmock('@/hooks/navigation/useBackHandler');

describe('useBackHandler', () => {
  let addEventListenerMock: jest.Mock;
  let removeEventListenerMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    removeEventListenerMock = jest.fn();
    addEventListenerMock = jest.fn(() => ({
      remove: removeEventListenerMock,
    }));
    jest.spyOn(BackHandler, 'addEventListener').mockImplementation(addEventListenerMock);

    // useFocusEffect automatically calls the provided callback immediately in the mock
    (useFocusEffect as jest.Mock).mockImplementation((cb) => {
      // In a real test we might want to manually trigger, but the standard setupJest.ts
      // triggers it immediately and returns the cleanup function.
      const cleanup = cb();
      // We attach the cleanup to the mock so we can call it in unmount tests if needed.
      // But standard renderHook unmount won't call useFocusEffect cleanup unless we mock it right.
      // Easiest is to just call cb() here and let the unmount logic naturally flow if possible,
      // or we just test the setup logic.
      return cleanup;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('registers back handler on focus', () => {
    const handler = jest.fn();
    renderHook(() => useBackHandler(handler));

    expect(BackHandler.addEventListener).toHaveBeenCalledWith(
      'hardwareBackPress',
      expect.any(Function),
    );
  });

  it('returns true if handler is null', () => {
    renderHook(() => useBackHandler(null));

    const mockCallback = addEventListenerMock.mock.calls[0][1];

    // Null handler should return true, preventing default back navigation
    expect(mockCallback()).toBe(true);
  });

  it('returns boolean based on handler return value', () => {
    const handler = jest.fn().mockReturnValue(true);
    renderHook(() => useBackHandler(handler));

    const mockCallback = addEventListenerMock.mock.calls[0][1];

    expect(mockCallback()).toBe(true);
    expect(handler).toHaveBeenCalled();
  });

  it('returns false if handler returns false', () => {
    const handler = jest.fn().mockReturnValue(false);
    renderHook(() => useBackHandler(handler));

    const mockCallback = addEventListenerMock.mock.calls[0][1];

    expect(mockCallback()).toBe(false);
  });
});
