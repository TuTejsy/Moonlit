import React from 'react';
import { Keyboard } from 'react-native';

import { act, renderHook } from '@testing-library/react-native';

import { SharedKeyboardHeightProvider, useSharedKeyboardHeight } from '../useSharedKeyboardHeight';

jest.unmock('@/hooks/useSharedKeyboardHeight');

jest.mock('@/utils/platformSelect', () => ({
  platformSelect: jest.fn(({ ios }) => ios),
}));

describe('useSharedKeyboardHeight', () => {
  let addListenerMock: jest.Mock;
  let showCallbacks: ((e: any) => void)[] = [];
  let hideCallbacks: ((e: any) => void)[] = [];

  beforeEach(() => {
    showCallbacks = [];
    hideCallbacks = [];
    addListenerMock = jest.fn((event: string, cb: any) => {
      if (event === 'keyboardWillShow' || event === 'keyboardDidShow') {
        showCallbacks.push(cb);
      }
      if (event === 'keyboardWillHide' || event === 'keyboardDidHide') {
        hideCallbacks.push(cb);
      }
      return { remove: jest.fn() };
    });
    jest.spyOn(Keyboard, 'addListener').mockImplementation(addListenerMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws error if used outside of provider', () => {
    // Suppress console.error for expected thrown error
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useSharedKeyboardHeight())).toThrow(
      'useSharedKeyboardHeight can not be used outside SharedKeyboardHeightProvider',
    );

    spy.mockRestore();
  });

  it('renders children and provides a shared value', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SharedKeyboardHeightProvider>{children}</SharedKeyboardHeightProvider>
    );

    const { result } = renderHook(() => useSharedKeyboardHeight(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.value).toBe(0);
  });

  it('updates shared value on keyboard show and hide', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SharedKeyboardHeightProvider>{children}</SharedKeyboardHeightProvider>
    );

    const { result } = renderHook(() => useSharedKeyboardHeight(), { wrapper });

    act(() => {
      showCallbacks.forEach((cb) => cb({ endCoordinates: { height: 300 } }));
    });

    expect(result.current.value).toBe(300);

    act(() => {
      hideCallbacks.forEach((cb) => cb({}));
    });

    expect(result.current.value).toBe(0);
  });
});
