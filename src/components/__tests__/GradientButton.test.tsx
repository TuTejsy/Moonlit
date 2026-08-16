import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { GradientButton } from '../GradientButton/GradientButton';

describe('GradientButton', () => {
  it('renders the button text', async () => {
    await render(<GradientButton onPress={jest.fn()}>Subscribe</GradientButton>);

    expect(screen.getByText('Subscribe')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();

    await render(<GradientButton onPress={onPress}>Subscribe</GradientButton>);

    fireEvent.press(screen.getByText('Subscribe'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without children', async () => {
    await render(<GradientButton onPress={jest.fn()} />);

    expect(screen.toJSON()).toBeTruthy();
  });
});
