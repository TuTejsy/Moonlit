import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { useStories } from '@/hooks/database/useStories';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';

import { HomeScreen } from '../HomeScreen/HomeScreen';

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HomeScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders SearchBar with placeholder text', () => {
    render(<HomeScreen />);

    expect(screen.getByPlaceholderText('Look for stories')).toBeOnTheScreen();
  });

  it('shows DefaultList by default when no search and input not focused', () => {
    const mockStories = [{ name: 'Story 1' }, { name: 'Story 2' }];
    (useStories as jest.Mock).mockReturnValueOnce([mockStories, 1]).mockReturnValueOnce([[], 0]);

    render(<HomeScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('shows search results when search text is entered', () => {
    render(<HomeScreen />);

    const searchInput = screen.getByPlaceholderText('Look for stories');
    fireEvent.changeText(searchInput, 'cinderella');

    expect(screen.toJSON()).toBeTruthy();
  });

  it('shows PopularSearch when input is focused and no search text', () => {
    render(<HomeScreen />);

    const searchInput = screen.getByPlaceholderText('Look for stories');
    fireEvent(searchInput, 'focus');

    expect(screen.toJSON()).toBeTruthy();
  });

  it('calls useScrollOpacity hook', () => {
    render(<HomeScreen />);

    expect(useScrollOpacity).toHaveBeenCalled();
  });
});
