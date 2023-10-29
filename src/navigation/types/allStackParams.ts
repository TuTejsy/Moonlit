import { RootStackParams } from '../RootNavigator/RootNavigator.types';
import { SharedStackParams } from '../SharedNavigator/SharedNavigator.types';
import { TabStackParams } from '../TabNavigator/TabNavigator.types';

export type AllStackParams = RootStackParams & SharedStackParams & TabStackParams;
