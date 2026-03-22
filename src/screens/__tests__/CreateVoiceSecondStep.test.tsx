import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { useAppLocalization } from '@/localization/useAppLocalization';

import { CreateVoiceSecondStep } from '../CreateVoice/CreateVoiceSecondStep/CreateVoiceSecondStep';

jest.mock('@/localization/useAppLocalization');

jest.mock('@/components/Headers/ScreenHeader/ScreenHeader', () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const RN = require('react-native');
  return {
    ScreenHeader: ({ title }: any) => <RN.Text>{title}</RN.Text>,
  };
});

describe('CreateVoiceSecondStep', () => {
  beforeEach(() => {
    (useAppLocalization as jest.Mock).mockReturnValue({
      localize: (_namespace: string, key: string) => key,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<CreateVoiceSecondStep />);

    expect(screen.getByText('createYourVoice')).toBeTruthy();
  });
});
