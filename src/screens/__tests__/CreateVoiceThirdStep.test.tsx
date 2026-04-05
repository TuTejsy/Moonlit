import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { useAppRoute } from '@/navigation/hooks/useAppRoute';

import { CreateVoiceThirdStep } from '../CreateVoice/CreateVoiceThirdStep/CreateVoiceThirdStep';

jest.mock('@/components/Headers/ScreenHeader/ScreenHeader', () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const RN = require('react-native');
  return {
    ScreenHeader: ({ title }: any) => <RN.Text>{title}</RN.Text>,
  };
});

const MOCK_STORY_NAME = 'The Elves and the Shoemaker';

describe('CreateVoiceThirdStep', () => {
  beforeEach(() => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { storyName: MOCK_STORY_NAME },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CreateVoiceThirdStep />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('displays the correct header title', () => {
    render(<CreateVoiceThirdStep />);

    expect(screen.getByText('common.createYourVoice')).toBeOnTheScreen();
  });

  it('displays the voice submitted gradient title', () => {
    render(<CreateVoiceThirdStep />);

    expect(screen.getByText('createVoice.voiceSubmitted')).toBeOnTheScreen();
  });

  it('displays the description text', () => {
    render(<CreateVoiceThirdStep />);

    expect(screen.getByText('createVoice.voiceSubmittedDescription')).toBeOnTheScreen();
  });

  it('displays the processing note', () => {
    render(<CreateVoiceThirdStep />);

    expect(screen.getByText('createVoice.processingTime')).toBeOnTheScreen();
    expect(screen.getByText('createVoice.processingProgress')).toBeOnTheScreen();
  });

  it('displays the go to main screen button', () => {
    render(<CreateVoiceThirdStep />);

    expect(screen.getByText('createVoice.goToMainScreen')).toBeOnTheScreen();
  });
});
