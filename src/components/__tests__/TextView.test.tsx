import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { TextView } from '../Primitives/TextView/TextView';

describe('TextView', () => {
  it('renders the provided text', () => {
    render(<TextView>Hello World</TextView>);

    expect(screen.getByText('Hello World')).toBeOnTheScreen();
  });

  it('renders with bold type', () => {
    render(<TextView type='bold'>Bold Text</TextView>);

    expect(screen.getByText('Bold Text')).toBeOnTheScreen();
  });

  it('renders with medium type', () => {
    render(<TextView type='medium'>Medium Text</TextView>);

    expect(screen.getByText('Medium Text')).toBeOnTheScreen();
  });

  it('renders with light type', () => {
    render(<TextView type='light'>Light Text</TextView>);

    expect(screen.getByText('Light Text')).toBeOnTheScreen();
  });

  it('renders with default regular type', () => {
    render(<TextView>Regular Text</TextView>);

    expect(screen.getByText('Regular Text')).toBeOnTheScreen();
  });

  it('passes additional TextProps', () => {
    render(<TextView numberOfLines={1}>Truncated Text</TextView>);

    const text = screen.getByText('Truncated Text');
    expect(text).toHaveProp('numberOfLines', 1);
  });

  it('disables font scaling', () => {
    render(<TextView>No Scale</TextView>);

    const text = screen.getByText('No Scale');
    expect(text).toHaveProp('allowFontScaling', false);
  });
});
