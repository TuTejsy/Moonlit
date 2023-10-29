import React from 'react';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';
import { ScreenHeader, ScreenHeaderProps } from '../ScreenHeader/ScreenHeader';

export interface SearchHeaderProps extends ScreenHeaderProps {}

export const SearchHeader = (props: SearchHeaderProps) => {

  const navigation = useAppNavigation();

  const onPressSearch = () => {
    navigation.navigate(getRouteNameForTab(SharedRoutes.SEARCH, navigationService.activeTab));
  };

  const renderRight = (
    <PressableView hitSlop={EXTRA_TOUCH_AREA} testID='searchBtn' onPress={onPressSearch}>
      {/* <Icons.Search /> */}
    </PressableView>
  );

  return <ScreenHeader renderRight={renderRight} {...props} />;
};
