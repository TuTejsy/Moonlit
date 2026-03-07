import { act, renderHook } from '@testing-library/react-native';

import { StoriesDB } from '@/database';
import { useHandleStoryFavorite } from '@/hooks/database/useHandleStoryFavorite';
import { useStory } from '@/hooks/database/useStory';
import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';

jest.unmock('@/hooks/database/useHandleStoryFavorite');

jest.mock('@/hooks/database/useStory', () => ({
  useStory: jest.fn(),
}));

jest.mock('@/database', () => ({
  StoriesDB: {
    modify: jest.fn((cb) => cb()),
  },
}));

jest.mock('@/services/analytics/analytics', () => ({
  AnalyticsService: {
    logTaleLikedEvent: jest.fn(),
  },
}));

describe('useHandleStoryFavorite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing if story is not found', () => {
    (useStory as jest.Mock).mockReturnValue([null, 0]);

    const { result } = renderHook(() =>
      useHandleStoryFavorite({
        source: SOURCE.TALE_PREVIEW,
        storyId: 1,
        storyName: 'Test Tale',
        tab: 'All tales',
      }),
    );

    act(() => {
      result.current.handleStoryFavoritePress();
    });

    expect(StoriesDB.modify).not.toHaveBeenCalled();
    expect(AnalyticsService.logTaleLikedEvent).not.toHaveBeenCalled();
    expect(result.current.isFavorite).toBe(false);
  });

  it('toggles favorite to true and logs analytics when initially false', () => {
    const mockStory = { is_favorite: false, saved_at_timestamp: 0 };
    (useStory as jest.Mock).mockReturnValue([mockStory, 1]);

    const { result } = renderHook(() =>
      useHandleStoryFavorite({
        source: SOURCE.TALE_PREVIEW,
        storyId: 1,
        storyName: 'Test Tale',
        tab: 'All tales',
      }),
    );

    expect(result.current.isFavorite).toBe(false);

    act(() => {
      result.current.handleStoryFavoritePress();
    });

    expect(AnalyticsService.logTaleLikedEvent).toHaveBeenCalledWith({
      name: 'Test Tale',
      source: SOURCE.TALE_PREVIEW,
      tab: 'All tales',
    });

    expect(StoriesDB.modify).toHaveBeenCalled();
    expect(mockStory.is_favorite).toBe(true);
    expect(mockStory.saved_at_timestamp).toBeGreaterThan(0);
  });

  it('toggles favorite to false and does not log analytics when initially true', () => {
    const mockStory = { is_favorite: true, saved_at_timestamp: 0 };
    (useStory as jest.Mock).mockReturnValue([mockStory, 1]);

    const { result } = renderHook(() =>
      useHandleStoryFavorite({
        source: SOURCE.TALE_PREVIEW,
        storyId: 1,
        storyName: 'Test Tale',
        tab: 'All tales',
      }),
    );

    expect(result.current.isFavorite).toBe(true);

    act(() => {
      result.current.handleStoryFavoritePress();
    });

    expect(AnalyticsService.logTaleLikedEvent).not.toHaveBeenCalled();

    expect(StoriesDB.modify).toHaveBeenCalled();
    expect(mockStory.is_favorite).toBe(false);
  });
});
