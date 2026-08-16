import {
  isKnownPaywallVariantName,
  normalizeAdaptyPaywallName,
  pickFlowRemoteConfigData,
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

  it('picks the English remote config data when multiple locales exist', () => {
    expect(
      pickFlowRemoteConfigData({
        remoteConfigs: [
          { data: { title_text: 'Titre' }, lang: 'fr' },
          { data: { title_text: 'Title' }, lang: 'en' },
        ],
      } as never),
    ).toEqual({ title_text: 'Title' });
  });

  it('falls back to the first remote config when English is missing', () => {
    expect(
      pickFlowRemoteConfigData({
        remoteConfigs: [{ data: { title_text: 'Titre' }, lang: 'fr' }],
      } as never),
    ).toEqual({ title_text: 'Titre' });
  });

  it('returns null when remote configs are missing', () => {
    expect(pickFlowRemoteConfigData({ name: 'TOGGLE' } as never)).toBeNull();
    expect(pickFlowRemoteConfigData({ remoteConfigs: [] } as never)).toBeNull();
  });

  it('identifies known paywall variant names', () => {
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.toggle)).toBe(true);
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.selection)).toBe(true);
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.scrollable)).toBe(true);
    expect(isKnownPaywallVariantName(PAYWALL_NAMES.staticDefaultProd)).toBe(true);
    expect(isKnownPaywallVariantName('SELECTION_TRIAL')).toBe(true);
    expect(isKnownPaywallVariantName('STATIC_DEFAULT_PROD_A')).toBe(true);
    expect(isKnownPaywallVariantName('UNKNOWN')).toBe(false);
  });
});
