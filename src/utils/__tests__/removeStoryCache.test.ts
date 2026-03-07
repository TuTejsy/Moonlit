import RNFS from 'react-native-fs';

import { SANDBOX } from '@/constants/common';
import { StorySchema } from '@/database/schema/stories/types';

import { removeStoryCache } from '../documents/removeStoryCache';

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/Documents',
  unlink: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/constants/common', () => ({
  SANDBOX: {
    DOCUMENTS: {
      FULL_COVER: '/mock/Documents/full_cover',
      MEDIUM_PREVIEW: '/mock/Documents/medium_preview',
      SMALL_PREVIEW: '/mock/Documents/small_preview',
    },
  },
}));

const createMockStory = (overrides: Partial<StorySchema> = {}): StorySchema => ({
  author: 'Test',
  category_ids: [1],
  created_at_timestamp: 1000,
  description: 'desc',
  description_large: 'desc large',
  full_cover_cached_name: null,
  full_cover_url: '',
  id: 1,
  is_coming_soon: false,
  is_favorite: false,
  is_featuring: false,
  is_free: true,
  medium_cover_cached_name: null,
  medium_cover_url: '',
  name: 'Test',
  played_count: 0,
  revision: 1,
  small_cover_cached_name: null,
  small_cover_url: '',
  type: 1,
  updated_at_timestamp: 1000,
  ...overrides,
});

describe('removeStoryCache', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls RNFS.unlink for all cached covers when all are present', async () => {
    const story = createMockStory({
      full_cover_cached_name: '1.jpg',
      medium_cover_cached_name: '1_med.png',
      small_cover_cached_name: '1_sm.webp',
    });

    await removeStoryCache(story);

    expect(RNFS.unlink).toHaveBeenCalledWith(`file://${SANDBOX.DOCUMENTS.FULL_COVER}/1.jpg`);
    expect(RNFS.unlink).toHaveBeenCalledWith(
      `file://${SANDBOX.DOCUMENTS.MEDIUM_PREVIEW}/1_med.png`,
    );
    expect(RNFS.unlink).toHaveBeenCalledWith(`file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/1_sm.webp`);
    expect(RNFS.unlink).toHaveBeenCalledTimes(3);
  });

  it('does not call RNFS.unlink for covers that are not cached', async () => {
    const story = createMockStory({
      full_cover_cached_name: '1.jpg',
    });

    await removeStoryCache(story);

    expect(RNFS.unlink).toHaveBeenCalledTimes(1);
    expect(RNFS.unlink).toHaveBeenCalledWith(`file://${SANDBOX.DOCUMENTS.FULL_COVER}/1.jpg`);
  });

  it('does not call RNFS.unlink when no covers are cached', async () => {
    const story = createMockStory();

    await removeStoryCache(story);

    expect(RNFS.unlink).not.toHaveBeenCalled();
  });
});
