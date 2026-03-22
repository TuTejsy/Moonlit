import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { SelectStoryList } from '../AIVoiceScreen/components/SelectStoryList/SelectStoryList';

const mockStories = [
  {
    author: 'Author 1',
    category_ids: [1],
    created_at_timestamp: 1000,
    description: 'Desc 1',
    description_large: 'Desc 1 Large',
    full_cover_url: 'https://example.com/full1.png',
    id: 1,
    is_coming_soon: false,
    is_favorite: false,
    is_featuring: false,
    is_free: true,
    medium_cover_cached_name: 'cached1.png',
    medium_cover_url: 'https://example.com/medium1.png',
    name: 'The Elves and the Shoemaker',
    played_count: 0,
    revision: 1,
    small_cover_url: 'https://example.com/small1.png',
    type: 1,
    updated_at_timestamp: 1000,
  },
  {
    author: 'Author 2',
    category_ids: [2],
    created_at_timestamp: 2000,
    description: 'Desc 2',
    description_large: 'Desc 2 Large',
    full_cover_url: 'https://example.com/full2.png',
    id: 2,
    is_coming_soon: false,
    is_favorite: false,
    is_featuring: false,
    is_free: false,
    medium_cover_cached_name: null,
    medium_cover_url: 'https://example.com/medium2.png',
    name: "The Dragon's Lullaby",
    played_count: 0,
    revision: 1,
    small_cover_url: 'https://example.com/small2.png',
    type: 1,
    updated_at_timestamp: 2000,
  },
  {
    author: 'Author 3',
    category_ids: [3],
    created_at_timestamp: 3000,
    description: 'Desc 3',
    description_large: 'Desc 3 Large',
    full_cover_url: 'https://example.com/full3.png',
    id: 3,
    is_coming_soon: false,
    is_favorite: false,
    is_featuring: false,
    is_free: false,
    medium_cover_cached_name: 'cached3.png',
    medium_cover_url: 'https://example.com/medium3.png',
    name: 'Calming Rain',
    played_count: 0,
    revision: 1,
    small_cover_url: 'https://example.com/small3.png',
    type: 1,
    updated_at_timestamp: 3000,
  },
];

describe('SelectStoryList', () => {
  const mockOnStorySelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <SelectStoryList
        selectedStoryId={null}
        stories={mockStories}
        storiesVersion={0}
        onStorySelect={mockOnStorySelect}
      />,
    );

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the correct number of story cells', () => {
    render(
      <SelectStoryList
        selectedStoryId={null}
        stories={mockStories}
        storiesVersion={0}
        onStorySelect={mockOnStorySelect}
      />,
    );

    const cells = screen.getAllByTestId('SelectStoryCell');
    expect(cells).toHaveLength(3);
  });

  it('displays story titles', () => {
    render(
      <SelectStoryList
        selectedStoryId={null}
        stories={mockStories}
        storiesVersion={0}
        onStorySelect={mockOnStorySelect}
      />,
    );

    expect(screen.getByText('The Elves and the Shoemaker')).toBeOnTheScreen();
    expect(screen.getByText("The Dragon's Lullaby")).toBeOnTheScreen();
    expect(screen.getByText('Calming Rain')).toBeOnTheScreen();
  });

  it('calls onStorySelect when a cell is pressed', () => {
    render(
      <SelectStoryList
        selectedStoryId={null}
        stories={mockStories}
        storiesVersion={0}
        onStorySelect={mockOnStorySelect}
      />,
    );

    const cells = screen.getAllByTestId('SelectStoryCell');
    fireEvent.press(cells[0]);

    expect(mockOnStorySelect).toHaveBeenCalledWith(1);
  });

  it('calls onStorySelect with correct storyId for different cells', () => {
    render(
      <SelectStoryList
        selectedStoryId={null}
        stories={mockStories}
        storiesVersion={0}
        onStorySelect={mockOnStorySelect}
      />,
    );

    const cells = screen.getAllByTestId('SelectStoryCell');
    fireEvent.press(cells[1]);

    expect(mockOnStorySelect).toHaveBeenCalledWith(2);
  });

  it('renders the list testID', () => {
    render(
      <SelectStoryList
        selectedStoryId={null}
        stories={mockStories}
        storiesVersion={0}
        onStorySelect={mockOnStorySelect}
      />,
    );

    expect(screen.getByTestId('SelectStoryList')).toBeOnTheScreen();
  });
});
