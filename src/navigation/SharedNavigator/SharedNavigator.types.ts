import { SortConfig } from '@/hooks/database/useStories';

import { SharedRoutes } from './SharedNavigator.routes';

export interface SharedStackParams extends Record<string, object | undefined> {
  [SharedRoutes.CREATE_VOICE_FIRST_STEP]?: undefined;
  [SharedRoutes.CREATE_VOICE_SECOND_STEP]?: undefined;
  [SharedRoutes.HOME]?: {
    initalRoute?: boolean;
  };
  [SharedRoutes.STORIES_LIST]?: {
    storiesFilter?: string;
    storiesSortConfigs?: SortConfig[];
    title?: string;
  };
}
