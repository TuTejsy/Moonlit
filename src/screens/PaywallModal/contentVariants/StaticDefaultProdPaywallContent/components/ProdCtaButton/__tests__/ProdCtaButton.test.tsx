import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { ProdCtaButton } from '../ProdCtaButton';

describe('ProdCtaButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the label', async () => {
    await render(<ProdCtaButton label='Go to listen stories' onPress={jest.fn()} />);

    expect(screen.getByText('Go to listen stories')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();

    await render(<ProdCtaButton label='Subscribe' onPress={onPress} />);

    fireEvent.press(screen.getByTestId('prod-cta-button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();

    await render(<ProdCtaButton disabled label='Subscribe' onPress={onPress} />);

    fireEvent.press(screen.getByTestId('prod-cta-button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with default disabled=false', async () => {
    await render(<ProdCtaButton label='Subscribe' onPress={jest.fn()} />);

    expect(screen.getByTestId('prod-cta-button')).toBeEnabled();
  });

  it('is disabled when disabled prop is true', async () => {
    await render(<ProdCtaButton disabled label='Subscribe' onPress={jest.fn()} />);

    expect(screen.getByTestId('prod-cta-button')).toBeDisabled();
  });

  it('does not render the bleed animation layer when width is zero', async () => {
    await render(<ProdCtaButton label='Subscribe' onPress={jest.fn()} />);

    expect(screen.queryByTestId('prod-cta-bleed')).toBeNull();
  });
});
