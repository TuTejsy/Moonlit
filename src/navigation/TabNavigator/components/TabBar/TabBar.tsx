// import { TextStyle, TouchableWithoutFeedback, View } from 'react-native';

// import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import { useNavigationState } from '@react-navigation/native';

// import { isSandbox } from '@/constants/common';
// import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
// import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
// import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
// import { TabBarBadge } from '@/navigation/TabNavigator/components/TabBarBadge/TabBarBadge';
// import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
// import { navigationService } from '@/services/navigation/navigationService';

// import { makeStyles } from './TabBar.styles';

// import { useCartMetaQuery } from '@/api/cart/queries/useCartMetaQuery';
// import { Icons } from '@/assets/icons/Icons';
// import { getCurrentRoute } from '@/utils/navigation/getCurrentRoute';

// const MAP_ICON_BY_ROUTE = {
//   [TabRoutes.HOME]: Icons.Home,
//   [TabRoutes.CATALOG]: Icons.Catalog,
//   [TabRoutes.CART]: Icons.Cart,
//   [TabRoutes.ACCOUNT]: Icons.Account,
// };

// const ROUTES_WITH_DISABLED_SHADOW: string[] = [TabRoutes.CART, SharedRoutes.CART];

// export const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
//   const currentRouteName = useNavigationState(getCurrentRoute);

//   const styles = useMakeStyles(makeStyles, {
//     disableShadow:
//       currentRouteName?.endsWith(SharedRoutes.PRODUCT_CARD) ||
//       (!!currentRouteName && ROUTES_WITH_DISABLED_SHADOW.includes(currentRouteName)),
//   });

//   const { data: cartMeta } = useCartMetaQuery();

//   return (
//     <View style={styles.tabBarWrapper}>
//       <View style={styles.tabBar}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];

//           const isFocused = state.index === index;
//           const isCart = route.name === TabRoutes.CART;

//           if (isFocused && navigationService.activeTab !== route.name) {
//             navigationService.onChangeActiveTab(route.name as TabRoutes);
//           }

//           const onPress = () => {
//             const event = navigation.emit({
//               canPreventDefault: true,
//               target: route.key,
//               type: 'tabPress',
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               // The `merge: true` option makes sure that the params inside the tab screen are preserved
//               navigation.navigate({ merge: true, name: route.name, params: undefined });
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               target: route.key,
//               type: 'tabLongPress',
//             });

//             if (route.name === TabRoutes.HOME && isSandbox()) {
//               navigation.navigate(RootRoutes.DEBUG);
//             }
//           };

//           const Icon = MAP_ICON_BY_ROUTE[route.name as TabRoutes];

//           return (
//             <TouchableWithoutFeedback
//               key={route.name}
//               accessibilityHint={`Open ${route.name} screen`}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               accessibilityRole='button'
//               accessibilityState={isFocused ? { selected: true } : {}}
//               testID={options.tabBarTestID}
//               onLongPress={onLongPress}
//               onPress={onPress}
//             >
//               <View style={styles.shapeIconWrapper}>
//                 <View style={[styles.shapeIcon, isFocused && styles.shapeIconFocused]}>
//                   <Icon
//                     testID={`icon-${route.name}`}
//                     style={[
//                       (isFocused ? styles.iconFocused : styles.icon) as TextStyle,
//                       isCart && styles.cartIcon,
//                     ]}
//                   />

//                   {isCart && <TabBarBadge value={cartMeta?.totalAmountOfItems} />}
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           );
//         })}
//       </View>
//     </View>
//   );
// };
