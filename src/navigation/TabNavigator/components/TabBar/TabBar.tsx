import { TouchableWithoutFeedback, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';

import { makeStyles } from './TabBar.styles';

const MAP_ICON_AND_TITLE_BY_ROUTE: { [key: string]: [typeof Icons.HomeTab, string] } = {
  [TabRoutes.HOME]: [Icons.HomeTab, 'Home'],
  [TabRoutes.SEARCH]: [Icons.SearchTab, 'Explore'],
  [TabRoutes.FAVORITES]: [Icons.FavoritesTab, 'Saved'],
};

export const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.tabBarShadow}>
      <LinearGradient
        angle={180}
        colors={[colors.opacityDarkPurple(0), colors.opacityDarkPurple(1)]}
        locations={[0, 1]}
      >
        <LinearGradient
          angle={180}
          colors={[colors.opacityDarkPurple(0), colors.opacityDarkPurple(1)]}
          locations={[0, 1]}
        >
          <LinearGradient
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

                const [Icon, title] = MAP_ICON_AND_TITLE_BY_ROUTE[route.name as TabRoutes];

                return (
                  <TouchableWithoutFeedback
                    key={route.name}
                    accessibilityHint={`Open ${route.name} screen`}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    accessibilityRole='button'
                    accessibilityState={isFocused ? { selected: true } : {}}
                    onPress={onPress}
                  >
                    <View style={styles.tabContainer}>
                      <Icon
                        color={isFocused ? colors.white : colors.opacityWhite(0.5)}
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
          </LinearGradient>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};
