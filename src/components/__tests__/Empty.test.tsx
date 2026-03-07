import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { Empty } from '../Empty/Empty';

describe('Empty', () => {
  it('renders the provided text', () => {
    render(<Empty text='No stories found' />);

    expect(screen.getByText('No stories found')).toBeOnTheScreen();
  });

  it('renders differently with different text', () => {
    render(<Empty text='Nothing to see here' />);

    expect(screen.getByText('Nothing to see here')).toBeOnTheScreen();
  });
});
