import { SortConfig } from '@/hooks/database/useStories';

export type StoryCoverType = 'small' | 'medium' | 'full';

export const POPULAR_STORIES_CONFIG: SortConfig = {
  reverse: true,
  sortDescriptor: 'played_count',
};

export const FEATURING_STORIES_FILTER = 'is_featuring = true';

export const FREE_STORIES_FILTER = 'is_free = true';
