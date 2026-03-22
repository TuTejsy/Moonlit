import { SortConfig } from '@/hooks/database/useStories';

export const FREE_STORIES_CONFIG: SortConfig[] = [
  {
    reverse: true,
    sortDescriptor: 'is_free',
  },
];
