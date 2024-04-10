import { SortConfig } from '@/hooks/database/useStories';

import { SharedRoutes } from './SharedNavigator.routes';

export interface SharedStackParams extends Record<string, object | undefined> {
  [SharedRoutes.HOME]?: {
    initalRoute?: boolean;
  };
  [SharedRoutes.STORIES_LIST]?: {
    storiesFilter?: string;
    storiesSortConfig?: SortConfig;
    title?: string;
  };
}
