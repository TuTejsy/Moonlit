import { StorySchema } from '@/database/schema/stories/types';

import { getImageFilePathForStory } from '../urls/getImageFilePathForStory';

jest.mock('@/constants/common', () => ({
  SANDBOX: {
    DOCUMENTS: {
      FULL_COVER: '/mock/full_cover',
      MEDIUM_PREVIEW: '/mock/medium_preview',
      SMALL_PREVIEW: '/mock/small_preview',
    },
  },
}));

const createMockStory = (overrides: Partial<StorySchema> = {}): StorySchema => ({
  author: 'Test Author',
  category_ids: [1],
  created_at_timestamp: 1000,
  description: 'desc',
  description_large: 'desc large',
  full_cover_cached_name: null,
  full_cover_url: 'https://example.com/full.jpg',
  id: 1,
  is_coming_soon: false,
  is_favorite: false,
  is_featuring: false,
  is_free: true,
  medium_cover_cached_name: null,
  medium_cover_url: 'https://example.com/medium.jpg',
  name: 'Test Story',
  played_count: 0,
  revision: 1,
  small_cover_cached_name: null,
  small_cover_url: 'https://example.com/small.jpg',
  type: 1,
  updated_at_timestamp: 1000,
  ...overrides,
});

describe('getImageFilePathForStory', () => {
  it('returns the full cover path when full cache is available and upToType is "full"', () => {
    const story = createMockStory({ full_cover_cached_name: '1.jpg' });

    const result = getImageFilePathForStory(story, 'full');

    expect(result).toBe('file:///mock/full_cover/1.jpg');
  });

  it('falls back to medium cover when full is not cached and upToType is "full"', () => {
    const story = createMockStory({ medium_cover_cached_name: '1.jpg' });

    const result = getImageFilePathForStory(story, 'full');

    expect(result).toBe('file:///mock/medium_preview/1.jpg');
  });

  it('falls back to small cover when full and medium are not cached', () => {
    const story = createMockStory({ small_cover_cached_name: '1.jpg' });

    const result = getImageFilePathForStory(story, 'full');

    expect(result).toBe('file:///mock/small_preview/1.jpg');
  });

  it('returns the small cover path when upToType is "small"', () => {
    const story = createMockStory({
      full_cover_cached_name: '1_full.jpg',
      medium_cover_cached_name: '1_med.jpg',
      small_cover_cached_name: '1_small.jpg',
    });

    const result = getImageFilePathForStory(story, 'small');

    expect(result).toBe('file:///mock/small_preview/1_small.jpg');
  });

  it('returns the medium cover path when upToType is "medium" and medium is cached', () => {
    const story = createMockStory({
      medium_cover_cached_name: '1_med.jpg',
      small_cover_cached_name: '1_small.jpg',
    });

    const result = getImageFilePathForStory(story, 'medium');

    expect(result).toBe('file:///mock/medium_preview/1_med.jpg');
  });

  it('returns undefined when no covers are cached', () => {
    const story = createMockStory();

    const result = getImageFilePathForStory(story, 'full');

    expect(result).toBeUndefined();
  });

  it('prefers larger cover types when multiple are cached and upToType allows them', () => {
    const story = createMockStory({
      medium_cover_cached_name: '1_med.jpg',
      small_cover_cached_name: '1_small.jpg',
    });

    const result = getImageFilePathForStory(story, 'full');

    expect(result).toBe('file:///mock/medium_preview/1_med.jpg');
  });
});
