import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';
import type { AdaptyPaywallProduct } from 'react-native-adapty';

import { useLayout } from '@/hooks/theme/useLayout';

import { StaticDefaultProdPaywallContent } from '../StaticDefaultProdPaywallContent';

const createProduct = (
  overrides: Partial<AdaptyPaywallProduct> & Pick<AdaptyPaywallProduct, 'vendorProductId'>,
): AdaptyPaywallProduct =>
  ({
    accessLevelId: 'premium',
    adaptyId: overrides.vendorProductId,
    localizedDescription: 'description',
    localizedTitle: 'title',
    paywallABTestName: 'test',
    paywallName: 'STATIC_DEFAULT_PROD',
    paywallProductIndex: 0,
    productType: 'subscription',
    variationId: 'variation',
    ...overrides,
  } as AdaptyPaywallProduct);

const weeklyProduct = createProduct({
  price: { amount: 9.99, currencySymbol: '$', localizedString: '$9.99' },
  subscription: {
    localizedSubscriptionPeriod: '1 week',
    subscriptionPeriod: { numberOfUnits: 1, unit: 'week' },
  },
  vendorProductId: 'weekly',
});

const yearlyProduct = createProduct({
  price: { amount: 39.99, currencySymbol: '$', localizedString: '$39.99' },
  subscription: {
    localizedSubscriptionPeriod: '1 year',
    subscriptionPeriod: { numberOfUnits: 1, unit: 'year' },
  },
  vendorProductId: 'yearly',
});

const defaultProps = {
  isFreeTrialEnabled: false,
  isTrialEligible: false,
  onRestorePress: jest.fn(),
  onSelectProduct: jest.fn(),
  onSkipPress: jest.fn(),
  onUnlockPress: jest.fn(),
  remoteConfig: {
    showBottomSkipButton: false,
  },
  selectedProduct: yearlyProduct,
  trialProduct: undefined,
  unlockButtonText: 'Begin your adventure',
  weeklyProduct,
  yearlyProduct,
};

describe('StaticDefaultProdPaywallContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders localized fallback title, subtitle, and CTA when remote config text is empty', async () => {
    await render(<StaticDefaultProdPaywallContent {...defaultProps} />);

    expect(screen.getByText('paywall.getAccessToAllTales')).toBeOnTheScreen();
    expect(
      screen.getByText('paywall.discoverUniqueVoicesAndListenToClassicFairyTales'),
    ).toBeOnTheScreen();
    expect(screen.getByText('paywall.staticDefaultProdCtaLabel')).toBeOnTheScreen();
  });

  it('renders remote config title, subtitle, and buy button overrides', async () => {
    await render(
      <StaticDefaultProdPaywallContent
        {...defaultProps}
        remoteConfig={{
          buyButtonText: 'Custom CTA',
          showBottomSkipButton: false,
          subtitleText: 'Custom subtitle',
          titleText: 'Custom title',
        }}
      />,
    );

    expect(screen.getByText('Custom title')).toBeOnTheScreen();
    expect(screen.getByText('Custom subtitle')).toBeOnTheScreen();
    expect(screen.getByText('Custom CTA')).toBeOnTheScreen();
    expect(screen.queryByText('paywall.getAccessToAllTales')).toBeNull();
  });

  it('renders skip as the first footer action when showBottomSkipButton is true', async () => {
    await render(
      <StaticDefaultProdPaywallContent
        {...defaultProps}
        remoteConfig={{
          showBottomSkipButton: true,
        }}
      />,
    );

    expect(screen.getByText('common.skip')).toBeOnTheScreen();
    expect(screen.getByText('common.terms')).toBeOnTheScreen();
  });

  it('calls onSkipPress when footer skip is pressed', async () => {
    const onSkipPress = jest.fn();

    await render(
      <StaticDefaultProdPaywallContent
        {...defaultProps}
        remoteConfig={{
          showBottomSkipButton: true,
        }}
        onSkipPress={onSkipPress}
      />,
    );

    fireEvent.press(screen.getByText('common.skip'));

    expect(onSkipPress).toHaveBeenCalledTimes(1);
  });

  it('does not render footer skip when showBottomSkipButton is false', async () => {
    await render(<StaticDefaultProdPaywallContent {...defaultProps} />);

    expect(screen.queryByText('common.skip')).toBeNull();
  });

  it('renders remote config title and subtitle on square screens', async () => {
    (useLayout as jest.Mock).mockReturnValue({
      dh: (value: number) => value,
      dw: (value: number) => value,
      horizontalPadding: 16,
      isLandscape: false,
      isPortrait: true,
      isSquareScreen: true,
      windowHeight: 844,
      windowWidth: 390,
    });

    await render(
      <StaticDefaultProdPaywallContent
        {...defaultProps}
        remoteConfig={{
          showBottomSkipButton: false,
          subtitleText: 'Square subtitle',
          titleText: 'Square title',
        }}
      />,
    );

    expect(screen.getByText('Square title')).toBeOnTheScreen();
    expect(screen.getByText('Square subtitle')).toBeOnTheScreen();
  });
});
