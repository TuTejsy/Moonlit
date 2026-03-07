import { act, renderHook } from '@testing-library/react-native';

import { StoriesRepository } from '@/api/stories/stories';
import { StoriesDB } from '@/database';
import { useStoriesUpdate } from '@/hooks/content/useStoriesUpdate';
import { removeStoryCache } from '@/utils/documents/removeStoryCache';

jest.unmock('@/hooks/content/useStoriesUpdate');

jest.mock('@/api/stories/stories', () => ({
  StoriesRepository: {
    getStories: jest.fn(),
  },
}));

jest.mock('@/database', () => ({
  StoriesDB: {
    delete: jest.fn(),
    object: jest.fn(),
    objects: jest.fn(),
    upsert: jest.fn(),
  },
}));

jest.mock('@/utils/documents/removeStoryCache', () => ({
  removeStoryCache: jest.fn(),
}));

describe('useStoriesUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockApiStories = [
    {
      author: 'Author 1',
      category_ids: [1],
      created_at_timestamp: '2023-01-01T00:00:00Z',
      description: 'Desc 1',
      description_large: 'Large Desc 1',
      full_cover_url: 'url1_full',
      id: 1,
      is_coming_soon: false,
      is_featuring: false,
      is_free: true,
      medium_cover_url: 'url1_med',
      name: 'Story 1',
      played_count: 10,
      revision: 1,
      small_cover_url: 'url1_small',
      updated_at_timestamp: '2023-01-02T00:00:00Z',
    },
    {
      author: 'Author 2',
      category_ids: [2],
      created_at_timestamp: '2023-02-01T00:00:00Z',
      description: 'Desc 2',
      description_large: 'Large Desc 2',
      full_cover_url: 'url2_full',
      id: 2,
      is_coming_soon: true,
      is_featuring: true,
      is_free: false,
      medium_cover_url: 'url2_med',
      name: 'Story 2',
      played_count: 20,
      revision: 2, // new revision
      small_cover_url: 'url2_small',
      updated_at_timestamp: '2023-02-02T00:00:00Z',
    },
  ];

  it('updates stories correctly', async () => {
    (StoriesRepository.getStories as jest.Mock).mockResolvedValue(mockApiStories);

    // Mock returning an existing story for ID 1 and 2
    (StoriesDB.object as jest.Mock).mockImplementation((id: number) => {
      if (id === 1) {
        return { id: 1, is_favorite: true, revision: 1 };
      }
      if (id === 2) {
        return { id: 2, is_favorite: false, revision: 1 };
      } // Will trigger cache remove
      return null;
    });

    (StoriesDB.upsert as jest.Mock).mockResolvedValue([null, []]);
    (StoriesDB.objects as jest.Mock).mockReturnValue([
      { id: 1, is_favorite: true, revision: 1 },
      { id: 2, is_favorite: false, revision: 1 },
      { id: 3, is_favorite: false, revision: 1 }, // Story 3 not in API, will be deleted
    ]);

    const { result } = renderHook(() => useStoriesUpdate(false));

    let error: any;

    await act(async () => {
      error = await result.current[1]();
    });

    expect(error).toBeNull();

    // Verify upsert was called with transformed dates
    const upsertCall = (StoriesDB.upsert as jest.Mock).mock.calls[0][0];
    expect(upsertCall).toHaveLength(2);
    expect(upsertCall[0].id).toBe(1);
    expect(upsertCall[0].is_favorite).toBe(true);
    expect(upsertCall[0].created_at_timestamp).toBe(new Date('2023-01-01T00:00:00Z').getTime());

    // Verify cache removed for revision changed
    expect(removeStoryCache).toHaveBeenCalledWith({ id: 2, is_favorite: false, revision: 1 });

    // Verify story 3 was removed since it's not in the API
    expect(removeStoryCache).toHaveBeenCalledWith({ id: 3, is_favorite: false, revision: 1 });
    expect(StoriesDB.delete).toHaveBeenCalledWith([3]);
  });

  it('skips initial load when loadInitially is false', () => {
    renderHook(() => useStoriesUpdate(false));

    expect(StoriesRepository.getStories).not.toHaveBeenCalled();
  });

  it('performs initial load when loadInitially is true', async () => {
    (StoriesRepository.getStories as jest.Mock).mockResolvedValue([]);
    (StoriesDB.upsert as jest.Mock).mockResolvedValue([null, []]);
    (StoriesDB.objects as jest.Mock).mockReturnValue([]);

    renderHook(() => useStoriesUpdate(true));

    await act(async () => {
      await new Promise(setImmediate);
    });

    expect(StoriesRepository.getStories).toHaveBeenCalledTimes(1);
  });

  it('retries update on error when loadInitially is true', async () => {
    const errorMock = new Error('Test Error');
    (StoriesRepository.getStories as jest.Mock)
      .mockRejectedValueOnce(errorMock)
      .mockResolvedValueOnce([]); // Mock success on retry

    (StoriesDB.upsert as jest.Mock).mockResolvedValue([null, []]);
    (StoriesDB.objects as jest.Mock).mockReturnValue([]);

    renderHook(() => useStoriesUpdate(true));

    // Wait for internal retry promise chain to settle
    await act(async () => {
      await new Promise(setImmediate);
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    expect(StoriesRepository.getStories).toHaveBeenCalledTimes(2);
  });
});
