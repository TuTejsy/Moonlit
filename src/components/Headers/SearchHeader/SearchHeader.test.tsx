import { useNavigation } from '@react-navigation/native';
import { render, fireEvent, renderHook } from '@testing-library/react-native';

import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';
import { TestWrapper } from '@/testsUtils/helpers/TestWrapper';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { SearchHeader, SearchHeaderProps } from './SearchHeader';

describe('SearchHeader', () => {
  const renderComponent = (props?: SearchHeaderProps) =>
    render(
      <TestWrapper>
        <SearchHeader {...props} />
      </TestWrapper>,
    );

  it('Should render title, back and search buttons correctly', async () => {
    const screen = renderComponent({ title: 'Screen Title' });

    const title = screen.getByText('Screen Title');
    const searchBtn = screen.getByTestId('searchBtn');
    const backBtn = screen.getByTestId('searchBtn');

    expect(title).not.toBeNull();
    expect(searchBtn).not.toBeNull();
    expect(backBtn).not.toBeNull();
  });

  it('Should have search icon and navigate to search screen on press', async () => {
    const screen = renderComponent();
    const { result } = renderHook(() => useNavigation());

    const searchBtn = screen.getByTestId('searchBtn');
    fireEvent.press(searchBtn);

    expect(result.current.navigate).toBeCalledWith(
      getRouteNameForTab(SharedRoutes.SEARCH, navigationService.activeTab),
    );
  });
});
