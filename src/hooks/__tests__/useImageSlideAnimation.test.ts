import { renderHook } from '@testing-library/react-native';

import { useImageSlideAnimation } from '../useImageSlideAnimation';

jest.unmock('@/hooks/useImageSlideAnimation');

describe('useImageSlideAnimation', () => {
  it('returns handleImageLayout and imageAnimatedStyle', () => {
    const { result } = renderHook(() => useImageSlideAnimation(300));

    expect(result.current.handleImageLayout).toBeDefined();
    expect(typeof result.current.handleImageLayout).toBe('function');
    expect(result.current.imageAnimatedStyle).toBeDefined();
  });

  it('returns a stable handleImageLayout reference', () => {
    const { rerender, result } = renderHook(() => useImageSlideAnimation(300));

    const first = result.current.handleImageLayout;

    rerender({});

    expect(result.current.handleImageLayout).toBe(first);
  });
});
