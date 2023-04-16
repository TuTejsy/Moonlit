import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import { RootRoutes } from './RootNavigator/RootNavigator.routes';
import type { RootStackParams } from './RootNavigator/RootNavigator.types';
import { SharedRoutes } from './SharedNavigator/SharedNavigator.routes';
import type { SharedStackParams } from './SharedNavigator/SharedNavigator.types';
import { TabRoutes } from './TabNavigator/TabNavigator.routes';
import type { TabStackParams } from './TabNavigator/TabNavigator.types';

export type RootScreenProps<T extends RootRoutes> = StackScreenProps<RootStackParams, T>;

export type TabScreenProps<T extends TabRoutes> = CompositeScreenProps<
  BottomTabScreenProps<TabStackParams, T>,
  StackScreenProps<RootStackParams, RootRoutes>
>;

// export type SharedScreenProps<T extends SharedRoutes> = CompositeScreenProps<
//   StackScreenProps<SharedStackParams, T>,
//   CompositeScreenProps<
//     StackScreenProps<RootStackParams, RootRoutes>,
//     BottomTabScreenProps<TabStackParams, TabRoutes>
//   >
// >;
