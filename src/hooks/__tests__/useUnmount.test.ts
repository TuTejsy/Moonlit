import { renderHook } from '@testing-library/react-native';

import { useUnmount } from '../useUnmount';

jest.unmock('@/hooks/useUnmount');

describe('useUnmount', () => {
  it('calls the callback on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useUnmount(callback));

    expect(callback).not.toHaveBeenCalled();

    unmount();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls the latest callback version on unmount', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender, unmount } = renderHook(({ callback }) => useUnmount(callback), {
      initialProps: { callback: callback1 },
    });

    rerender({ callback: callback2 });

    unmount();

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
