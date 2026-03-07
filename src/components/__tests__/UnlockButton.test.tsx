import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { SOURCE } from '@/services/analytics/analytics.constants';

import { UnlockButton } from '../Buttons/UnlockButton/UnlockButton';

describe('UnlockButton', () => {
  const mockShowPaywallModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useShowPaywallModal as jest.Mock).mockReturnValue({
      showPaywallModal: mockShowPaywallModal,
    });
  });

  it('renders the button text', () => {
    render(<UnlockButton source={SOURCE.HOME_VIEW}>Unlock All</UnlockButton>);

    expect(screen.getByText('Unlock All')).toBeOnTheScreen();
  });

  it('calls showPaywallModal when pressed', () => {
    render(<UnlockButton source={SOURCE.HOME_VIEW}>Unlock</UnlockButton>);

    fireEvent.press(screen.getByText('Unlock'));

    expect(mockShowPaywallModal).toHaveBeenCalledWith(
      expect.objectContaining({
        contentName: 'Promotion banner',
        source: SOURCE.HOME_VIEW,
      }),
    );
  });
});
