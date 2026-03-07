import { renderHook, act } from '@testing-library/react-native';

import { useTimeout } from '../useTimeout';

jest.useFakeTimers();

describe('useTimeout', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('returns a set and clear function tuple', () => {
    const { result } = renderHook(() => useTimeout());

    const [set, clear] = result.current;

    expect(typeof set).toBe('function');
    expect(typeof clear).toBe('function');
  });

  it('calls the handler after the specified timeout', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current[0](handler, 1000);
    });

    expect(handler).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('clears the existing timeout when a new one is set', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current[0](handler1, 500);
    });

    act(() => {
      result.current[0](handler2, 500);
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('clears the timeout when the clear function is called', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current[0](handler, 500);
    });

    act(() => {
      result.current[1]();
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('clears the timeout on unmount', () => {
    const handler = jest.fn();
    const { result, unmount } = renderHook(() => useTimeout());

    act(() => {
      result.current[0](handler, 1000);
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
