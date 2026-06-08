import { renderHook } from '@testing-library/react-native';

import { useUnmount } from '../useUnmount';

jest.unmock('@/hooks/useUnmount');

describe('useUnmount', () => {
  it('calls the callback on unmount', async () => {
    const callback = jest.fn();
    const { unmount } = await renderHook(() => useUnmount(callback));

    expect(callback).not.toHaveBeenCalled();

    await unmount();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls the latest callback version on unmount', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender, unmount } = await renderHook(
      ({ callback }: { callback: () => void }) => useUnmount(callback),
      {
        initialProps: { callback: callback1 },
      },
    );

    await rerender({ callback: callback2 });

    await unmount();

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
