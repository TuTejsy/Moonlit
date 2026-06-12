import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { ProdPlanRow } from '../ProdPlanRow';

const defaultProps = {
  detail: 'Cancel anytime',
  isSelected: false,
  name: 'YEARLY',
  onPress: jest.fn(),
  price: '$0.77',
  priceUnit: '/week',
  testID: 'prod-plan-yearly',
};

describe('ProdPlanRow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the plan name, price and detail', async () => {
    await render(<ProdPlanRow {...defaultProps} />);

    expect(screen.getByText('YEARLY')).toBeOnTheScreen();
    expect(screen.getByText('$0.77')).toBeOnTheScreen();
    expect(screen.getByText('Cancel anytime')).toBeOnTheScreen();
  });

  it('renders the priceUnit', async () => {
    await render(<ProdPlanRow {...defaultProps} />);

    expect(screen.getByText('/week')).toBeOnTheScreen();
  });

  it('calls onPress when the row is pressed', async () => {
    const onPress = jest.fn();

    await render(<ProdPlanRow {...defaultProps} onPress={onPress} />);

    fireEvent.press(screen.getByTestId('prod-plan-yearly'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the badge when badgeLabel is provided', async () => {
    await render(<ProdPlanRow {...defaultProps} badgeLabel='BEST VALUE' />);

    expect(screen.getByText('BEST VALUE')).toBeOnTheScreen();
  });

  it('does not render a badge when badgeLabel is undefined', async () => {
    await render(<ProdPlanRow {...defaultProps} badgeLabel={undefined} />);

    expect(screen.queryByText('BEST VALUE')).toBeNull();
  });

  it('has radio accessibilityRole', async () => {
    await render(<ProdPlanRow {...defaultProps} />);

    expect(screen.getByTestId('prod-plan-yearly').props.accessibilityRole).toBe('radio');
  });

  it('reflects selected state in accessibility', async () => {
    await render(<ProdPlanRow {...defaultProps} isSelected />);

    expect(screen.getByTestId('prod-plan-yearly').props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true }),
    );
  });

  it('reflects unselected state in accessibility', async () => {
    await render(<ProdPlanRow {...defaultProps} isSelected={false} />);

    expect(screen.getByTestId('prod-plan-yearly').props.accessibilityState).toEqual(
      expect.objectContaining({ selected: false }),
    );
  });
});
