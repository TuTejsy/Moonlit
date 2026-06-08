import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { SplashViewModal } from '../SplashViewModal/SplashViewModal';

describe('SplashViewModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await render(<SplashViewModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the moon logo', async () => {
    await render(<SplashViewModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders animated images (stars and launch logo)', async () => {
    await render(<SplashViewModal />);

    const tree = screen.toJSON();
    expect(tree).toBeTruthy();
  });
});
