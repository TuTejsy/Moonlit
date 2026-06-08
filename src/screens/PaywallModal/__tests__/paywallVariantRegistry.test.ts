import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';

import { ScrollablePaywallContent } from '../contentVariants/ScrollablePaywallContent/ScrollablePaywallContent';
import { SelectionPaywallContent } from '../contentVariants/SelectionPaywallContent/SelectionPaywallContent';
import { SwitcherPaywallContent } from '../contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import {
  PAYWALL_NAMES,
  resolvePaywallAnalyticsType,
  resolvePaywallVariant,
} from '../paywallVariantRegistry';

describe('paywallVariantRegistry', () => {
  it('resolves TOGGLE to SwitcherPaywallContent', () => {
    expect(resolvePaywallVariant(PAYWALL_NAMES.toggle)).toBe(SwitcherPaywallContent);
  });

  it('resolves SELECTION to SelectionPaywallContent', () => {
    expect(resolvePaywallVariant(PAYWALL_NAMES.selection)).toBe(SelectionPaywallContent);
  });

  it('resolves SCROLLABLE to ScrollablePaywallContent', () => {
    expect(resolvePaywallVariant(PAYWALL_NAMES.scrollable)).toBe(ScrollablePaywallContent);
  });

  it('falls back to SwitcherPaywallContent for unknown names', () => {
    expect(resolvePaywallVariant('UNKNOWN')).toBe(SwitcherPaywallContent);
    expect(resolvePaywallVariant(null)).toBe(SwitcherPaywallContent);
    expect(resolvePaywallVariant(undefined)).toBe(SwitcherPaywallContent);
  });

  it('resolves paywall names case-insensitively', () => {
    expect(resolvePaywallVariant('selection')).toBe(SelectionPaywallContent);
    expect(resolvePaywallVariant('  SCROLLABLE  ')).toBe(ScrollablePaywallContent);
  });

  it('resolves analytics type from paywall name', () => {
    expect(resolvePaywallAnalyticsType(PAYWALL_NAMES.toggle)).toBe(PAYWALL_TYPE.WITH_SWITCHER);
    expect(resolvePaywallAnalyticsType(PAYWALL_NAMES.selection)).toBe(PAYWALL_TYPE.WITH_SELECTION);
    expect(resolvePaywallAnalyticsType(PAYWALL_NAMES.scrollable)).toBe(
      PAYWALL_TYPE.WITH_SCROLLABLE,
    );
    expect(resolvePaywallAnalyticsType('UNKNOWN')).toBe(PAYWALL_TYPE.WITH_SWITCHER);
  });
});
