import { SharedRoutes } from './SharedNavigator.routes';

export interface SharedStackParams extends Record<string, object | undefined> {
  [SharedRoutes.STORIES_LIST]: {
    storiesFilter?: string;
    title?: string;
  };
}
