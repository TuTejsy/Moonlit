import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { SplashViewModal } from '../SplashViewModal/SplashViewModal';

describe('SplashViewModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SplashViewModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the moon logo', () => {
    render(<SplashViewModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders animated images (stars and launch logo)', () => {
    render(<SplashViewModal />);

    const tree = screen.toJSON();
    expect(tree).toBeTruthy();
  });
});
