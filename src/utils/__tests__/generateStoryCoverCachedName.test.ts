import { StorySchema } from '@/database/schema/stories/types';

import { generateStoryCoverCachedName } from '../generators/generateStoryCoverCachedName';

const createMockStory = (overrides: Partial<StorySchema> = {}): StorySchema => ({
  author: 'Test Author',
  category_ids: [1],
  created_at_timestamp: 1000,
  description: 'desc',
  description_large: 'desc large',
  full_cover_url: 'https://example.com/covers/full.jpg',
  id: 42,
  is_coming_soon: false,
  is_favorite: false,
  is_featuring: false,
  is_free: true,
  medium_cover_url: 'https://example.com/covers/medium.png',
  name: 'Test Story',
  played_count: 0,
  revision: 1,
  small_cover_url: 'https://example.com/covers/small.webp',
  type: 1,
  updated_at_timestamp: 1000,
  ...overrides,
});

describe('generateStoryCoverCachedName', () => {
  it('generates the cached name using the story id and full cover extension', () => {
    const story = createMockStory();

    expect(generateStoryCoverCachedName(story, 'full')).toBe('42.jpg');
  });

  it('generates the cached name using the story id and medium cover extension', () => {
    const story = createMockStory();

    expect(generateStoryCoverCachedName(story, 'medium')).toBe('42.png');
  });

  it('generates the cached name using the story id and small cover extension', () => {
    const story = createMockStory();

    expect(generateStoryCoverCachedName(story, 'small')).toBe('42.webp');
  });

  it('handles cover URLs with nested paths', () => {
    const story = createMockStory({
      full_cover_url: 'https://cdn.example.com/path/to/image.avif',
      id: 99,
    });

    expect(generateStoryCoverCachedName(story, 'full')).toBe('99.avif');
  });
});
