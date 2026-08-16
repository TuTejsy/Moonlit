import { act, renderHook } from '@testing-library/react-native';
import type { AdaptyPaywallProduct } from 'react-native-adapty';

import { useStaticDefaultProdPaywallProducts } from '../hooks/useStaticDefaultProdPaywallProducts';

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

const weeklyTrialProduct = createProduct({
  price: { amount: 9.99, currencySymbol: '$', localizedString: '$9.99' },
  subscription: {
    localizedSubscriptionPeriod: '1 week',
    offer: {
      identifier: { type: 'introductory' },
      phases: [
        {
          numberOfPeriods: 1,
          paymentMode: 'free_trial',
          price: { amount: 0, currencyCode: 'USD', localizedString: '$0.00' },
          subscriptionPeriod: { numberOfUnits: 3, unit: 'day' },
        },
      ],
    },
    subscriptionPeriod: { numberOfUnits: 1, unit: 'week' },
  },
  vendorProductId: 'weekly_trial',
});

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

describe('useStaticDefaultProdPaywallProducts', () => {
  it('selects trial product when free trial is enabled', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: true,
        onSelectProduct,
        selectedProduct: weeklyTrialProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    expect(result.current.weeklyIsSelected).toBe(true);
    expect(result.current.yearlyIsSelected).toBe(false);
  });

  it('selects yearly product when free trial is disabled', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: false,
        onSelectProduct,
        selectedProduct: yearlyProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    expect(result.current.yearlyIsSelected).toBe(true);
    expect(result.current.weeklyIsSelected).toBe(false);
  });

  it('calls onSelectProduct with trial product when weekly is pressed with trial enabled', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: true,
        onSelectProduct,
        selectedProduct: yearlyProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    await act(async () => {
      result.current.handleSelectWeekly();
    });

    expect(onSelectProduct).toHaveBeenCalledWith(weeklyTrialProduct);
  });

  it('calls onSelectProduct with yearly product when yearly is pressed', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: true,
        onSelectProduct,
        selectedProduct: weeklyTrialProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    await act(async () => {
      result.current.handleSelectYearly();
    });

    expect(onSelectProduct).toHaveBeenCalledWith(yearlyProduct);
  });

  it('returns trial days from trial product', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: true,
        onSelectProduct,
        selectedProduct: weeklyTrialProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    expect(result.current.trialDays).toBe(3);
  });

  it('handles undefined products gracefully (returns empty price strings and no trial days)', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: false,
        onSelectProduct,
        selectedProduct: undefined,
        trialProduct: undefined,
        weeklyProduct: undefined,
        yearlyProduct: undefined,
      }),
    );

    expect(result.current.weeklyPriceText).toBe('');
    expect(result.current.yearlyPriceText).toBe('');
    expect(result.current.trialDays).toBeUndefined();
  });

  it('returns weekly product price text when trial is disabled', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: false,
        onSelectProduct,
        selectedProduct: yearlyProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    expect(result.current.weeklyPriceText).toBe('$9.99');
  });

  it('returns ctaLabel as a non-empty string', async () => {
    const onSelectProduct = jest.fn();

    const { result } = await renderHook(() =>
      useStaticDefaultProdPaywallProducts({
        isFreeTrialEnabled: true,
        onSelectProduct,
        selectedProduct: weeklyTrialProduct,
        trialProduct: weeklyTrialProduct,
        weeklyProduct,
        yearlyProduct,
      }),
    );

    expect(typeof result.current.ctaLabel).toBe('string');
    expect(result.current.ctaLabel.length).toBeGreaterThan(0);
  });
});
