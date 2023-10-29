import { SortConfig } from '@/hooks/database/useStories';

export type StoryCoverType = 'small' | 'medium' | 'full';

export const POPULAR_STORIES_CONFIG: SortConfig = {
  reverse: true,
  sortDescriptor: 'played_count',
};

export const FREE_STORIES_FILTER = 'is_free = true';
