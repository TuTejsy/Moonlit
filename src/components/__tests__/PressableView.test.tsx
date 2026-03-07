import React from 'react';
import { View } from 'react-native';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { PressableView } from '../Primitives/PressableView/PressableView';

describe('PressableView', () => {
  it('renders children', () => {
    render(
      <PressableView>
        <View testID='child' />
      </PressableView>,
    );

    expect(screen.toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();

    render(<PressableView testID='pressable' onPress={onPress} />);

    fireEvent.press(screen.getByTestId('pressable'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('sets accessible to false by default', () => {
    render(<PressableView testID='pressable' />);

    const pressable = screen.getByTestId('pressable');
    expect(pressable).toHaveProp('accessible', false);
  });

  it('forwards additional PressableProps like testID', () => {
    render(<PressableView testID='my-pressable' />);

    expect(screen.getByTestId('my-pressable')).toBeOnTheScreen();
  });
});
