import { renderHook, act } from '@testing-library/react-native';

import { useImageLoaded } from '../useImageLoaded';

jest.unmock('@/hooks/useImageLoaded');

describe('useImageLoaded', () => {
  it('starts with isImageLoaded as false', async () => {
    const { result } = await renderHook(() => useImageLoaded());

    expect(result.current.isImageLoaded).toBe(false);
  });

  it('sets isImageLoaded to true when handleImageLoad is called', async () => {
    const { result } = await renderHook(() => useImageLoaded());

    await act(() => {
      result.current.handleImageLoad();
    });

    expect(result.current.isImageLoaded).toBe(true);
  });

  it('returns the same handleImageLoad reference across renders', async () => {
    const { rerender, result } = await renderHook(() => useImageLoaded());

    const first = result.current.handleImageLoad;

    await rerender({});

    expect(result.current.handleImageLoad).toBe(first);
  });
});
