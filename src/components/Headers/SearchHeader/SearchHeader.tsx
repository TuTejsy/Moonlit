import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { useTheme } from '@/hooks/theme/useTheme';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';
import { NavigationType } from '../Headers.types';
import { ScreenHeader, ScreenHeaderProps } from '../ScreenHeader/ScreenHeader';

export interface SearchHeaderProps extends ScreenHeaderProps {}

export const SearchHeader = (props: SearchHeaderProps) => {
  const { colors } = useTheme();

  const navigation = useNavigation<NavigationType>();

  const onPressSearch = () => {
    navigation.navigate(getRouteNameForTab(SharedRoutes.SEARCH, navigationService.activeTab));
  };

  const renderRight = (
    <PressableView hitSlop={EXTRA_TOUCH_AREA} testID='searchBtn' onPress={onPressSearch}>
      <Icons.SearchSmall color={colors.black900} />
    </PressableView>
  );

  return <ScreenHeader renderRight={renderRight} {...props} />;
};
