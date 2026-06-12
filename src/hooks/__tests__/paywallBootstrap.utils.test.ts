import {
  isKnownPaywallVariantName,
  normalizeAdaptyPaywallName,
} from '@/hooks/paywallBootstrap.utils';
import { PAYWALL_NAMES } from '@/screens/PaywallModal/paywallVariantRegistry';

describe('paywallBootstrap.utils', () => {
  it('normalizes Adapty paywall names to uppercase', () => {
    expect(normalizeAdaptyPaywallName({ name: 'selection' } as never)).toBe(
      PAYWALL_NAMES.selection,
    );
    expect(normalizeAdaptyPaywallName({ name: '  scrollable  ' } as never)).toBe(
      PAYWALL_NAMES.scrollable,
    );
  });

  it('identifies known paywall variant names', () => {
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.toggle)).toBe(true);
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.selection)).toBe(true);
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.scrollable)).toBe(true);
    expect(isKnownPaywallVariantName('SELECTION_TRIAL')).toBe(true);
    expect(isKnownPaywallVariantName('UNKNOWN')).toBe(false);
  });
});
