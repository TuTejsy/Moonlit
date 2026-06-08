import type { AdaptyPaywallProduct } from 'react-native-adapty';

type SubscriptionPeriodUnit = 'day' | 'week' | 'month' | 'year';

const PERIOD_RANK: Record<SubscriptionPeriodUnit, number> = {
  day: 0,
  month: 2,
  week: 1,
  year: 3,
};

export interface ResolvedPaywallProducts {
  trialProduct: AdaptyPaywallProduct | undefined;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

function getSubscriptionPeriodUnit(
  product: AdaptyPaywallProduct,
): SubscriptionPeriodUnit | undefined {
  const unit = product.subscription?.subscriptionPeriod?.unit;

  if (unit === 'day' || unit === 'week' || unit === 'month' || unit === 'year') {
    return unit;
  }

  return undefined;
}

function getPeriodRank(product: AdaptyPaywallProduct): number {
  const unit = getSubscriptionPeriodUnit(product);
  return unit !== undefined ? PERIOD_RANK[unit] : -1;
}

function hasSubscriptionOffer(product: AdaptyPaywallProduct): boolean {
  return !!product.subscription?.offer;
}

function sortByPeriodRank(products: AdaptyPaywallProduct[]): AdaptyPaywallProduct[] {
  return [...products].sort((left, right) => getPeriodRank(right) - getPeriodRank(left));
}

function sortByPeriodRankAscending(products: AdaptyPaywallProduct[]): AdaptyPaywallProduct[] {
  return [...products].sort((left, right) => getPeriodRank(left) - getPeriodRank(right));
}

export function resolvePaywallProducts(products: AdaptyPaywallProduct[]): ResolvedPaywallProducts {
  const subscriptionProducts = products.filter((product) => product.subscription);

  const trialProduct = subscriptionProducts.find(hasSubscriptionOffer);

  const yearlyProduct =
    subscriptionProducts.find(
      (product) => getSubscriptionPeriodUnit(product) === 'year' && product !== trialProduct,
    ) ??
    subscriptionProducts.find((product) => getSubscriptionPeriodUnit(product) === 'year') ??
    sortByPeriodRank(subscriptionProducts.filter((product) => !hasSubscriptionOffer(product)))[0] ??
    sortByPeriodRank(subscriptionProducts)[0];

  const weeklyProduct =
    subscriptionProducts.find(
      (product) =>
        getSubscriptionPeriodUnit(product) === 'week' &&
        product.vendorProductId !== trialProduct?.vendorProductId,
    ) ??
    subscriptionProducts.find((product) => getSubscriptionPeriodUnit(product) === 'week') ??
    trialProduct ??
    sortByPeriodRankAscending(
      subscriptionProducts.filter((product) => product !== yearlyProduct),
    )[0];

  return {
    trialProduct,
    weeklyProduct,
    yearlyProduct,
  };
}

export function formatProductPrice(product: AdaptyPaywallProduct | undefined): string {
  const price = product?.price;

  if (!price) {
    return '';
  }

  return formatPriceValue(price.amount, product);
}

export function formatPriceValue(
  amount: number | undefined,
  product: AdaptyPaywallProduct | undefined,
  fractionDigits?: number,
): string {
  const price = product?.price;

  if (amount === undefined || !price) {
    return '';
  }

  const formattedAmount =
    fractionDigits !== undefined ? amount.toFixed(fractionDigits) : String(amount);

  if (price.currencySymbol !== undefined) {
    return `${price.currencySymbol}${formattedAmount}`;
  }

  if (price.currencyCode !== undefined) {
    return `${formattedAmount} ${price.currencyCode}`;
  }

  return formattedAmount;
}

export function formatProductLocalizedPrice(product: AdaptyPaywallProduct | undefined): string {
  const price = product?.price;

  if (!price) {
    return '';
  }

  if (price.localizedString) {
    return price.localizedString;
  }

  return formatPriceValue(price.amount, product);
}

export function getFreeTrialOfferDays(
  product: AdaptyPaywallProduct | undefined,
): number | undefined {
  const phase =
    product?.subscription?.offer?.phases?.find(
      (offerPhase) => offerPhase.paymentMode === 'free_trial',
    ) ?? product?.subscription?.offer?.phases?.[0];

  const numberOfUnits = phase?.subscriptionPeriod?.numberOfUnits;
  const unit = phase?.subscriptionPeriod?.unit;

  if (numberOfUnits === undefined) {
    return undefined;
  }

  if (unit === 'day') {
    return numberOfUnits;
  }

  if (unit === 'week') {
    return numberOfUnits * 7;
  }

  if (unit === 'month') {
    return numberOfUnits * 30;
  }

  if (unit === 'year') {
    return numberOfUnits * 365;
  }

  return numberOfUnits;
}

export function getLocalizedSubscriptionPeriodLabel(
  product: AdaptyPaywallProduct | undefined,
  localize: (domain: 'paywall', key: 'week' | 'year') => string,
): string {
  if (!product) {
    return '';
  }

  const localizedPeriod = product.subscription?.localizedSubscriptionPeriod;

  if (localizedPeriod) {
    return localizedPeriod.replace(/^1\s/, '');
  }

  const unit = getSubscriptionPeriodUnit(product);

  if (unit === 'week') {
    return localize('paywall', 'week');
  }

  if (unit === 'year') {
    return localize('paywall', 'year');
  }

  return unit ?? '';
}
