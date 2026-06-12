import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { ProdTrialCard } from '../ProdTrialCard';

const defaultProps = {
  dueTodayText: '$0.00 due today',
  enabled: false,
  onToggle: jest.fn(),
  trialDays: 3,
};

describe('ProdTrialCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the due-today text when enabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled />);

    expect(screen.getByText('$0.00 due today')).toBeOnTheScreen();
  });

  it('calls onToggle when pressed', async () => {
    const onToggle = jest.fn();

    await render(<ProdTrialCard {...defaultProps} onToggle={onToggle} />);

    fireEvent.press(screen.getByTestId('prod-trial-card'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('shows the off-state title when disabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled={false} />);

    expect(screen.getByText('paywall.staticDefaultProdTrialCardOffTitle')).toBeOnTheScreen();
  });

  it('shows the on-state title when enabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled />);

    expect(screen.getByText('paywall.staticDefaultProdTrialCardOnTitle')).toBeOnTheScreen();
  });

  it('shows the off-state subtitle when disabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled={false} />);

    expect(screen.getByText('paywall.staticDefaultProdTrialCardOffSubtitle')).toBeOnTheScreen();
  });

  it('shows the on-state subtitle when enabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled />);

    expect(screen.getByText('paywall.staticDefaultProdTrialCardOnSubtitle')).toBeOnTheScreen();
  });

  it('has switch accessibilityRole', async () => {
    await render(<ProdTrialCard {...defaultProps} />);

    expect(screen.getByTestId('prod-trial-card').props.accessibilityRole).toBe('switch');
  });

  it('reflects checked state in accessibility when enabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled />);

    expect(screen.getByTestId('prod-trial-card').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true }),
    );
  });

  it('reflects unchecked state in accessibility when disabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled={false} />);

    expect(screen.getByTestId('prod-trial-card').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false }),
    );
  });

  it('shows the days-free label when enabled', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled trialDays={7} />);

    expect(screen.getByText('paywall.staticDefaultProdDaysFree')).toBeOnTheScreen();
  });

  it('falls back to 3 days when trialDays is undefined (default rendered)', async () => {
    await render(<ProdTrialCard {...defaultProps} enabled trialDays={undefined} />);

    expect(screen.getByText('paywall.staticDefaultProdDaysFree')).toBeOnTheScreen();
  });
});
