import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { GradientButton } from '../GradientButton/GradientButton';

describe('GradientButton', () => {
  it('renders the button text', () => {
    render(<GradientButton onPress={jest.fn()}>Subscribe</GradientButton>);

    expect(screen.getByText('Subscribe')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();

    render(<GradientButton onPress={onPress}>Subscribe</GradientButton>);

    fireEvent.press(screen.getByText('Subscribe'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without children', () => {
    render(<GradientButton onPress={jest.fn()} />);

    expect(screen.toJSON()).toBeTruthy();
  });
});
