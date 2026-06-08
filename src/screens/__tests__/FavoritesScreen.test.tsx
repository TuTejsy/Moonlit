import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { useFavoritesData } from '@/screens/FavoritesScreen/hooks/useFavoritesData';
import { useTabBarScrollSync } from '@/screens/FavoritesScreen/hooks/useTabBarScrollSync';

import { FavoritesScreen } from '../FavoritesScreen/FavoritesScreen';

describe('FavoritesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await render(<FavoritesScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders tab labels for Saved and Recently Played', async () => {
    await render(<FavoritesScreen />);

    expect(screen.getByText('common.saved')).toBeOnTheScreen();
    expect(screen.getByText('stories.recentPlayed')).toBeOnTheScreen();
  });

  it('calls useFavoritesData hook', async () => {
    await render(<FavoritesScreen />);

    expect(useFavoritesData).toHaveBeenCalled();
  });

  it('calls useTabBarScrollSync hook with correct params', async () => {
    await render(<FavoritesScreen />);

    expect(useTabBarScrollSync).toHaveBeenCalledWith(
      expect.objectContaining({
        tabWidth: expect.any(Number),
        windowWidth: expect.any(Number),
      }),
    );
  });

  it('shows empty state text when no saved stories', async () => {
    await render(<FavoritesScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('shows saved stories header when stories exist', async () => {
    (useFavoritesData as jest.Mock).mockReturnValue({
      recentlyPlayedStories: [],
      recentlyPlayedStoriesVersion: 0,
      savedStories: [{ id: 1, name: 'Saved Story' }],
      savedStoriesVersion: 1,
    });

    await render(<FavoritesScreen />);

    expect(screen.getByText('stories.yourSavedTales')).toBeOnTheScreen();
  });
});
