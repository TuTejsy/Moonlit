import { StorySchema } from '@/database/schema/stories/types';

import { generateMapStoriesToSaved } from '../generators/generateMapStoriesToSaved';

describe('generateMapStoriesToSaved', () => {
  const createMockResults = (stories: Partial<StorySchema>[]) => {
    const arr = stories.map(
      (s) =>
        ({
          id: s.id ?? 1,
          is_favorite: s.is_favorite ?? false,
        } as StorySchema),
    );

    return {
      ...arr,
      forEach: (cb: (story: StorySchema) => void) => arr.forEach(cb),
      length: arr.length,
    } as unknown as Realm.Results<StorySchema>;
  };

  it('creates a map of story IDs to their is_favorite status', () => {
    const stories = createMockResults([
      { id: 1, is_favorite: true },
      { id: 2, is_favorite: false },
      { id: 3, is_favorite: true },
    ]);

    const result = generateMapStoriesToSaved(stories);

    expect(result.get(1)).toBe(true);
    expect(result.get(2)).toBe(false);
    expect(result.get(3)).toBe(true);
  });

  it('returns an empty map for an empty collection', () => {
    const stories = createMockResults([]);

    const result = generateMapStoriesToSaved(stories);

    expect(result.size).toBe(0);
  });

  it('handles a single story', () => {
    const stories = createMockResults([{ id: 42, is_favorite: true }]);

    const result = generateMapStoriesToSaved(stories);

    expect(result.size).toBe(1);
    expect(result.get(42)).toBe(true);
  });
});
