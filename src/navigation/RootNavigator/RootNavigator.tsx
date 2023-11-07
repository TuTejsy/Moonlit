import { createStackNavigator } from '@react-navigation/stack';

import { SplashView } from '@/components/SplashView/SplashView';
import { useTheme } from '@/hooks/theme/useTheme';
import { useInitApp } from '@/hooks/useInitApp';
import { TabNavigator } from '@/navigation/TabNavigator/TabNavigator';
import { GetStartedScreen } from '@/screens/GetStartedScreen/GetStartedScreen';
import { StoryPlayerScreen } from '@/screens/StoryPlayerScreen/StoryPlayerScreen';

import {
  getStartedScreenOptions,
  rootOptions,
  storyPlayerOptions,
  tabOptions,
} from './RootNavigator.options';
import { RootRoutes } from './RootNavigator.routes';
import { RootStackParams } from './RootNavigator.types';

const RootStack = createStackNavigator<RootStackParams>();

export const RootNavigator = () => {
  const theme = useTheme();
  const { initialRouteName, isAppReady, onSplashAnimationEnd } = useInitApp();

  if (!isAppReady) {
    return <SplashView onAppReady={onSplashAnimationEnd} />;
  }

  return (
    <RootStack.Navigator initialRouteName={initialRouteName} screenOptions={rootOptions(theme)}>
      <RootStack.Screen component={TabNavigator} name={RootRoutes.TAB} options={tabOptions} />
      <RootStack.Screen
        component={StoryPlayerScreen}
        name={RootRoutes.STORY_PLAYER}
        options={storyPlayerOptions}
      />

      <RootStack.Screen
        component={GetStartedScreen}
        name={RootRoutes.GET_STARTED_SCREEN}
        options={getStartedScreenOptions}
      />
    </RootStack.Navigator>
  );
};
