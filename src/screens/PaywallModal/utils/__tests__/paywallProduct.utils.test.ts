import type { AdaptyPaywallProduct } from 'react-native-adapty';

import {
  formatPriceValue,
  formatProductLocalizedPrice,
  formatProductPrice,
  getFreeTrialOfferDays,
  getLocalizedSubscriptionPeriodLabel,
  resolvePaywallProducts,
} from '../paywallProduct.utils';

const createProduct = (
  overrides: Partial<AdaptyPaywallProduct> & Pick<AdaptyPaywallProduct, 'vendorProductId'>,
): AdaptyPaywallProduct =>
  ({
    accessLevelId: 'premium',
    adaptyId: overrides.vendorProductId,
    localizedDescription: 'description',
    localizedTitle: 'title',
    paywallABTestName: 'test',
    paywallName: 'TOGGLE',
    paywallProductIndex: 0,
    productType: 'subscription',
    variationId: 'variation',
    ...overrides,
  } as AdaptyPaywallProduct);

describe('resolvePaywallProducts', () => {
  it('resolves weekly trial and yearly products from App Store style catalog', () => {
    const weeklyWithTrial = createProduct({
      price: { amount: 4.99, currencyCode: 'USD', localizedString: '$4.99' },
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

    const yearly = createProduct({
      price: { amount: 39.99, currencyCode: 'USD', localizedString: '$39.99' },
      subscription: {
        localizedSubscriptionPeriod: '1 year',
        subscriptionPeriod: { numberOfUnits: 1, unit: 'year' },
      },
      vendorProductId: 'yearly',
    });

    const resolved = resolvePaywallProducts([weeklyWithTrial, yearly]);

    expect(resolved.trialProduct?.vendorProductId).toBe('weekly_trial');
    expect(resolved.weeklyProduct?.vendorProductId).toBe('weekly_trial');
    expect(resolved.yearlyProduct?.vendorProductId).toBe('yearly');
  });

  it('resolves yearly product even when trial offer is attached to annual SKU', () => {
    const annualWithTrial = createProduct({
      price: { amount: 49.99, currencyCode: 'USD', localizedString: '$49.99' },
      subscription: {
        localizedSubscriptionPeriod: '1 year',
        offer: {
          identifier: { type: 'introductory' },
          phases: [
            {
              numberOfPeriods: 1,
              paymentMode: 'free_trial',
              price: { amount: 0, currencyCode: 'USD', localizedString: '$0.00' },
              subscriptionPeriod: { numberOfUnits: 7, unit: 'day' },
            },
          ],
        },
        subscriptionPeriod: { numberOfUnits: 1, unit: 'year' },
      },
      vendorProductId: 'annual_trial',
    });

    const weekly = createProduct({
      price: { amount: 4.99, currencyCode: 'USD', localizedString: '$4.99' },
      subscription: {
        localizedSubscriptionPeriod: '1 week',
        subscriptionPeriod: { numberOfUnits: 1, unit: 'week' },
      },
      vendorProductId: 'weekly',
    });

    const resolved = resolvePaywallProducts([annualWithTrial, weekly]);

    expect(resolved.trialProduct?.vendorProductId).toBe('annual_trial');
    expect(resolved.yearlyProduct?.vendorProductId).toBe('annual_trial');
    expect(resolved.weeklyProduct?.vendorProductId).toBe('weekly');
  });
});

describe('formatProductLocalizedPrice', () => {
  it('prefers localizedString from StoreKit', () => {
    const product = createProduct({
      price: {
        amount: 39.99,
        currencyCode: 'USD',
        localizedString: '$39.99',
      },
      vendorProductId: 'yearly',
    });

    expect(formatProductLocalizedPrice(product)).toBe('$39.99');
  });

  it('falls back to currency code when symbol is missing', () => {
    const product = createProduct({
      price: {
        amount: 39.99,
        currencyCode: 'USD',
      },
      vendorProductId: 'yearly',
    });

    expect(formatProductLocalizedPrice(product)).toBe('39.99 USD');
    expect(formatPriceValue(1.92, product)).toBe('1.92 USD');
    expect(formatPriceValue(1.923456, product, 3)).toBe('1.923 USD');
  });
});

describe('formatProductPrice', () => {
  it('formats numeric amount using product currency metadata', () => {
    const product = createProduct({
      price: {
        amount: 4.99,
        currencySymbol: '$',
        localizedString: '$4.99',
      },
      vendorProductId: 'weekly',
    });

    expect(formatProductPrice(product)).toBe('$4.99');
  });
});

describe('getFreeTrialOfferDays', () => {
  it('converts free trial phase to days', () => {
    const product = createProduct({
      subscription: {
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

    expect(getFreeTrialOfferDays(product)).toBe(3);
  });
});

describe('getLocalizedSubscriptionPeriodLabel', () => {
  const localize = (_domain: 'paywall', key: 'week' | 'year') => (key === 'week' ? 'week' : 'year');

  it('uses localized subscription period when available', () => {
    const product = createProduct({
      subscription: {
        localizedSubscriptionPeriod: '1 year',
        subscriptionPeriod: { numberOfUnits: 1, unit: 'year' },
      },
      vendorProductId: 'yearly',
    });

    expect(getLocalizedSubscriptionPeriodLabel(product, localize)).toBe('year');
  });
});
