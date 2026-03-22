import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { CreateYourVoiceButton } from '../Buttons/CreateYourVoiceButton/CreateYourVoiceButton';
import {
  TEST_ID_CREATE_YOUR_VOICE_BUTTON,
  TEST_ID_CREATE_YOUR_VOICE_PRESSABLE,
} from '../Buttons/CreateYourVoiceButton/CreateYourVoiceButton.constants';

describe('CreateYourVoiceButton', () => {
  it('renders correctly', () => {
    render(<CreateYourVoiceButton onPress={jest.fn()} />);

    expect(screen.getByTestId(TEST_ID_CREATE_YOUR_VOICE_BUTTON)).toBeTruthy();
  });

  it('triggers onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    render(<CreateYourVoiceButton onPress={onPressMock} />);

    const pressable = screen.getByTestId(TEST_ID_CREATE_YOUR_VOICE_PRESSABLE);
    fireEvent.press(pressable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
