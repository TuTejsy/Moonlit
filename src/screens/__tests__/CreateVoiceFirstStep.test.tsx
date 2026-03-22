import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { CreateVoiceFirstStep } from '../CreateVoice/CreateVoiceFirstStep/CreateVoiceFirstStep';

jest.mock('@/components/Headers/ScreenHeader/ScreenHeader', () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const RN = require('react-native');
  return {
    ScreenHeader: ({ title }: any) => <RN.Text>{title}</RN.Text>,
  };
});

describe('CreateVoiceFirstStep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CreateVoiceFirstStep />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('displays the correct header title', () => {
    render(<CreateVoiceFirstStep />);

    expect(screen.getByText('common.createYourVoice')).toBeOnTheScreen();
  });

  it('displays the main gradient title', () => {
    render(<CreateVoiceFirstStep />);

    expect(screen.getByText('createVoice.readyToRecord')).toBeOnTheScreen();
  });

  it('displays the description text', () => {
    render(<CreateVoiceFirstStep />);

    expect(screen.getByText('createVoice.recordDescription')).toBeOnTheScreen();
  });

  it('displays the three tip strings', () => {
    render(<CreateVoiceFirstStep />);

    expect(screen.getByText('createVoice.tipQuietPlace')).toBeOnTheScreen();
    expect(screen.getByText('createVoice.tipSpeakNaturally')).toBeOnTheScreen();
    expect(screen.getByText('createVoice.tipHoldPhone')).toBeOnTheScreen();
  });

  it('renders the Start recording button text', () => {
    render(<CreateVoiceFirstStep />);

    expect(screen.getByText('createVoice.startRecording')).toBeOnTheScreen();
  });
});
