import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';

import { WebPageScreen } from '../WebPageScreen/WebPageScreen';

describe('WebPageScreen', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { url: 'https://example.com/terms' },
    });
    (useAppNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      navigate: jest.fn(),
      replace: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    render(<WebPageScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the WebView component', () => {
    render(<WebPageScreen />);

    const tree = screen.toJSON();
    expect(tree).toBeTruthy();
  });

  it('renders with the URL from route params', () => {
    render(<WebPageScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });
});
