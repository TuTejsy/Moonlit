import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';

import { ScrollablePaywallContent } from '../contentVariants/ScrollablePaywallContent/ScrollablePaywallContent';
import { SelectionPaywallContent } from '../contentVariants/SelectionPaywallContent/SelectionPaywallContent';
import { SwitcherPaywallContent } from '../contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import {
  PAYWALL_NAMES,
  resolvePaywallAnalyticsType,
  resolvePaywallVariant,
  resolvePaywallVariantName,
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

  it('resolves postfix paywall names to base variant', () => {
    expect(resolvePaywallVariantName('SELECTION_TRIAL')).toBe(PAYWALL_NAMES.selection);
    expect(resolvePaywallVariantName('SELECTION_WEEK_9_99')).toBe(PAYWALL_NAMES.selection);
    expect(resolvePaywallVariant('SELECTION_TRIAL')).toBe(SelectionPaywallContent);
    expect(resolvePaywallVariant('SELECTION_WEEK_9_99')).toBe(SelectionPaywallContent);
    expect(resolvePaywallVariant('SCROLLABLE_EXTRA')).toBe(ScrollablePaywallContent);
    expect(resolvePaywallVariant('TOGGLE_TRIAL')).toBe(SwitcherPaywallContent);
  });

  it('resolves analytics type for postfix paywall names', () => {
    expect(resolvePaywallAnalyticsType('SELECTION_TRIAL')).toBe(PAYWALL_TYPE.WITH_SELECTION);
    expect(resolvePaywallAnalyticsType('SELECTION_WEEK_9_99')).toBe(PAYWALL_TYPE.WITH_SELECTION);
    expect(resolvePaywallAnalyticsType('SCROLLABLE_EXTRA')).toBe(PAYWALL_TYPE.WITH_SCROLLABLE);
    expect(resolvePaywallAnalyticsType('TOGGLE_TRIAL')).toBe(PAYWALL_TYPE.WITH_SWITCHER);
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
