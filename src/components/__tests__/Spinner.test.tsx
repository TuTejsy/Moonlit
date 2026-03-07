import React from 'react';
import { View } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { Spinner } from '../Spinner/Spinner';

// The Spinner uses Animated.View + Icons.Loader which is mocked as string.
// We mock the Spinner's SVG icon to a simple component to avoid rendering issues.
jest.mock('@/assets/icons/Icons', () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { View: RNView } = require('react-native');
  return {
    Icons: {
      Loader: (_props: { color: string; height: number; width: number }) => (
        <RNView testID='loader-icon' />
      ),
    },
  };
});

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner testID='spinner' />);

    expect(screen.getByTestId('spinner')).toBeOnTheScreen();
  });

  it('renders the default loader icon', () => {
    render(<Spinner />);

    expect(screen.getByTestId('loader-icon')).toBeOnTheScreen();
  });

  it('renders custom children instead of default icon', () => {
    render(
      <Spinner>
        <View testID='custom-child' />
      </Spinner>,
    );

    expect(screen.getByTestId('custom-child')).toBeOnTheScreen();
  });
});
