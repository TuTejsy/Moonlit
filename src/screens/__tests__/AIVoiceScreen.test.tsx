import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { AIVoiceScreen } from '../AIVoiceScreen/AIVoiceScreen';

describe('AIVoiceScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AIVoiceScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('displays all three step labels', () => {
    render(<AIVoiceScreen />);

    expect(screen.getByText('aiVoice.stepOne')).toBeOnTheScreen();
    expect(screen.getByText('aiVoice.stepTwo')).toBeOnTheScreen();
    expect(screen.getByText('aiVoice.stepThree')).toBeOnTheScreen();
  });

  it('displays Choose a tale title', () => {
    render(<AIVoiceScreen />);

    expect(screen.getByText('common.chooseATale')).toBeOnTheScreen();
  });

  it('displays Create your voice section title', () => {
    render(<AIVoiceScreen />);

    expect(screen.getByText('aiVoice.createYourVoice')).toBeOnTheScreen();
  });

  it('displays Create your fairytale button text', () => {
    render(<AIVoiceScreen />);

    expect(screen.getByText('common.createYourFairytale')).toBeOnTheScreen();
  });

  it('displays See all link', () => {
    render(<AIVoiceScreen />);

    expect(screen.getByText('common.seeAll')).toBeOnTheScreen();
  });

  it('renders CreateYourVoiceButton', () => {
    render(<AIVoiceScreen />);

    expect(screen.getByTestId('CreateYourVoiceButton')).toBeOnTheScreen();
  });
});
