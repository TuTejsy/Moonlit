import { renderHook, act } from '@testing-library/react-native';

import { useImageLoaded } from '../useImageLoaded';

jest.unmock('@/hooks/useImageLoaded');

describe('useImageLoaded', () => {
  it('starts with isImageLoaded as false', () => {
    const { result } = renderHook(() => useImageLoaded());

    expect(result.current.isImageLoaded).toBe(false);
  });

  it('sets isImageLoaded to true when handleImageLoad is called', () => {
    const { result } = renderHook(() => useImageLoaded());

    act(() => {
      result.current.handleImageLoad();
    });

    expect(result.current.isImageLoaded).toBe(true);
  });

  it('returns the same handleImageLoad reference across renders', () => {
    const { rerender, result } = renderHook(() => useImageLoaded());

    const first = result.current.handleImageLoad;

    rerender({});

    expect(result.current.handleImageLoad).toBe(first);
  });
});
