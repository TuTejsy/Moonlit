import { useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { TrippleGradient } from '@/components/TrippleGradient/TrippleGradient';
import { isDevMode } from '@/constants/common';
import { StorySchema } from '@/database/schema/stories/types';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';
import { getHitSlop } from '@/utils/getHitSlop';

import { TabBarStoryPlayer } from './components/TabBarStoryPlayer/TabBarStoryPlayer';
import { makeStyles } from './TabBar.styles';

const MAP_ICON_AND_TITLE_BY_ROUTE: { [key: string]: [typeof Icons.HomeTab, string] } = {
  [TabRoutes.HOME]: [Icons.HomeTab, 'Home'],
  [TabRoutes.FAVORITES]: [Icons.FavoritesTab, 'Saved'],
  [TabRoutes.SETTINGS]: [Icons.SettingsTab, 'Settings'],
};

export const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const [recentlyPlayedStories, recentlyPlayedStoriesVersion] = useStories(
    'played_at_timestamp != nil',
    [
      {
        reverse: true,
        sortDescriptor: 'played_at_timestamp',
      },
    ],
  );

  const lastPlayedStory: StorySchema | undefined = useMemo(() => {
    return recentlyPlayedStories[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentlyPlayedStories, recentlyPlayedStoriesVersion]);

  const hasPlayer = !!lastPlayedStory;

  return (
    <>
      <View style={styles.tabBarShadow}>
        <TrippleGradient
          angle={180}
          colors={[colors.opacityDarkPurple(0), colors.opacityDarkPurple(1)]}
          locations={[0, 1]}
          style={styles.tabBarWrapper}
        >
          <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];

              const isFocused = state.index === index;

              if (isFocused && navigationService.activeTab !== route.name) {
                navigationService.onChangeActiveTab(route.name as TabRoutes);
              }

              const onPress = () => {
                const event = navigation.emit({
                  canPreventDefault: true,
                  target: route.key,
                  type: 'tabPress',
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({ merge: true, name: route.name, params: undefined });
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  target: route.key,
                  type: 'tabLongPress',
                });

                if (route.name === TabRoutes.SETTINGS && isDevMode()) {
                  navigation.navigate(RootRoutes.DEV_MENU_MODAL);
                }
              };

              const [Icon, title] = MAP_ICON_AND_TITLE_BY_ROUTE[route.name as TabRoutes];

              return (
                <TouchableWithoutFeedback
                  key={route.name}
                  accessibilityHint={`Open ${route.name} screen`}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  accessibilityRole='button'
                  accessibilityState={isFocused ? { selected: true } : {}}
                  hitSlop={getHitSlop(20)}
                  onLongPress={onLongPress}
                  onPress={onPress}
                >
                  <View style={styles.tabContainer}>
                    <Icon
                      color={isFocused ? colors.white : colors.white_50}
                      fill={isFocused ? colors.white : 'none'}
                    />
                    <TextView style={isFocused ? styles.activeTabTitle : styles.inactiveTabTitle}>
                      {title}
                    </TextView>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </TrippleGradient>
      </View>

      {hasPlayer && <TabBarStoryPlayer storyId={lastPlayedStory.id} />}
    </>
  );
};
