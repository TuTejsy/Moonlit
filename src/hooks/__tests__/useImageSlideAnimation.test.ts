import { renderHook } from '@testing-library/react-native';

import { useImageSlideAnimation } from '../useImageSlideAnimation';

jest.unmock('@/hooks/useImageSlideAnimation');

describe('useImageSlideAnimation', () => {
  it('returns handleImageLayout and imageAnimatedStyle', async () => {
    const { result } = await renderHook(() => useImageSlideAnimation(300));

    expect(result.current.handleImageLayout).toBeDefined();
    expect(typeof result.current.handleImageLayout).toBe('function');
    expect(result.current.imageAnimatedStyle).toBeDefined();
  });

  it('returns a stable handleImageLayout reference', async () => {
    const { rerender, result } = await renderHook(() => useImageSlideAnimation(300));

    const first = result.current.handleImageLayout;

    await rerender({});

    expect(result.current.handleImageLayout).toBe(first);
  });
});
