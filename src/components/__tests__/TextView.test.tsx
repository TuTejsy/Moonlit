import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { TextView } from '../Primitives/TextView/TextView';

describe('TextView', () => {
  it('renders the provided text', async () => {
    await render(<TextView>Hello World</TextView>);

    expect(screen.getByText('Hello World')).toBeOnTheScreen();
  });

  it('renders with bold type', async () => {
    await render(<TextView type='bold'>Bold Text</TextView>);

    expect(screen.getByText('Bold Text')).toBeOnTheScreen();
  });

  it('renders with medium type', async () => {
    await render(<TextView type='medium'>Medium Text</TextView>);

    expect(screen.getByText('Medium Text')).toBeOnTheScreen();
  });

  it('renders with light type', async () => {
    await render(<TextView type='light'>Light Text</TextView>);

    expect(screen.getByText('Light Text')).toBeOnTheScreen();
  });

  it('renders with default regular type', async () => {
    await render(<TextView>Regular Text</TextView>);

    expect(screen.getByText('Regular Text')).toBeOnTheScreen();
  });

  it('passes additional TextProps', async () => {
    await render(<TextView numberOfLines={1}>Truncated Text</TextView>);

    const text = screen.getByText('Truncated Text');
    expect(text).toHaveProp('numberOfLines', 1);
  });

  it('disables font scaling', async () => {
    await render(<TextView>No Scale</TextView>);

    const text = screen.getByText('No Scale');
    expect(text).toHaveProp('allowFontScaling', false);
  });
});
