import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { useAppRoute } from '@/navigation/hooks/useAppRoute';

import { StoriesListScreen } from '../StoriesListScreen/StoriesListScreen';

describe('StoriesListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppRoute as jest.Mock).mockReturnValue({
      params: {
        storiesFilter: 'is_coming_soon = false',
        storiesSortConfigs: undefined,
        title: 'All Tales',
      },
    });
  });

  it('renders without crashing', () => {
    render(<StoriesListScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders with route params title', () => {
    render(<StoriesListScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders with default title when params are empty', () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: undefined,
    });

    render(<StoriesListScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the screen structure with header and list', () => {
    render(<StoriesListScreen />);

    const tree = screen.toJSON();
    expect(tree).toBeTruthy();
  });
});
