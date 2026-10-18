import { renderHook } from '@testing-library/react-native';
import type { AdaptyPaywallProduct } from 'react-native-adapty';

import { localization } from '@/localization/localization';

import { resolvePaywallProducts } from '../../utils/paywallProduct.utils';
import { parsePaywallRemoteConfig } from '../../utils/paywallRemoteConfig.utils';
import { usePaywallProducts } from '../usePaywallProducts';

jest.unmock('@/screens/PaywallModal/hooks/usePaywallProducts');

jest.mock('../../utils/paywallProduct.utils', () => ({
  resolvePaywallProducts: jest.fn(),
}));

const trialProduct = { vendorProductId: 'trial' } as AdaptyPaywallProduct;
const yearlyProduct = { vendorProductId: 'yearly' } as AdaptyPaywallProduct;

describe('usePaywallProducts', () => {
  beforeEach(() => {
    jest.mocked(resolvePaywallProducts).mockReturnValue({
      trialProduct,
      weeklyProduct: undefined,
      yearlyProduct,
    });
  });

  it('defaults a toggle paywall to the trial product when toggle_state is true', async () => {
    const remoteConfig = parsePaywallRemoteConfig({
      buy_button_text_no_trial: 'Unlock',
      buy_button_text_trial: 'Start trial',
      toggle_state: true,
    });

    const { result } = await renderHook(() => usePaywallProducts([], 'TOGGLE', remoteConfig));

    expect(result.current.selectedProduct).toBe(trialProduct);
    expect(result.current.unlockButtonText).toBe('Start trial');
  });

  it('defaults to the yearly product and the non-trial label when toggle_state is off', async () => {
    const remoteConfig = parsePaywallRemoteConfig({
      buy_button_text_no_trial: 'Unlock',
      buy_button_text_trial: 'Start trial',
      toggle_state: false,
    });

    const { result } = await renderHook(() => usePaywallProducts([], 'TOGGLE_TRIAL', remoteConfig));

    expect(result.current.selectedProduct).toBe(yearlyProduct);
    expect(result.current.unlockButtonText).toBe('Unlock');
  });

  it('ignores toggle_state on non-toggle paywalls', async () => {
    const remoteConfig = parsePaywallRemoteConfig({ toggle_state: true });

    const { result } = await renderHook(() => usePaywallProducts([], 'SELECTION', remoteConfig));

    expect(result.current.selectedProduct).toBe(yearlyProduct);
    expect(result.current.unlockButtonText).toBe(
      localization.translate('promotion', 'beginYourAdventure'),
    );
  });
});
