import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import type { RootScreenProps } from '@/navigation/types';

type NavigationTypeFromProps = RootScreenProps<RootRoutes.STORY_PLAYER>;

export type NavigationType = NavigationTypeFromProps['navigation'];
export type RouteType = NavigationTypeFromProps['route'];
