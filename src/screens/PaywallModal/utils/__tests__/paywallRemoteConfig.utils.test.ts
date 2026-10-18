import { localization } from '@/localization/localization';

import { parsePaywallRemoteConfig } from '../paywallRemoteConfig.utils';

const defaultBuyButtonText = localization.translate('promotion', 'beginYourAdventure');

const defaultParsedConfig = {
  buyButtonTextNoTrial: defaultBuyButtonText,
  buyButtonTextTrial: defaultBuyButtonText,
  showBottomSkipButton: false,
  toggleState: false,
};

describe('parsePaywallRemoteConfig', () => {
  it('returns defaults when data is missing', () => {
    expect(parsePaywallRemoteConfig()).toEqual(defaultParsedConfig);
  });

  it('returns defaults when data is null', () => {
    expect(parsePaywallRemoteConfig(null)).toEqual(defaultParsedConfig);
  });

  it('parses show_bottom_skip_button when true', () => {
    expect(parsePaywallRemoteConfig({ show_bottom_skip_button: true })).toEqual({
      ...defaultParsedConfig,
      showBottomSkipButton: true,
    });
  });

  it('treats non-true show_bottom_skip_button as false', () => {
    expect(parsePaywallRemoteConfig({ show_bottom_skip_button: false })).toEqual(
      defaultParsedConfig,
    );

    expect(parsePaywallRemoteConfig({ show_bottom_skip_button: 'true' })).toEqual(
      defaultParsedConfig,
    );
  });

  it('parses toggle_state only when it is boolean true', () => {
    expect(parsePaywallRemoteConfig({ toggle_state: true })).toEqual({
      ...defaultParsedConfig,
      toggleState: true,
    });

    expect(parsePaywallRemoteConfig({ toggle_state: 'true' })).toEqual(defaultParsedConfig);
    expect(parsePaywallRemoteConfig({ toggle_state: false })).toEqual(defaultParsedConfig);
  });

  it('parses trial and non-trial buy button texts', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text_no_trial: ' Unlock ',
        buy_button_text_trial: ' Start trial ',
      }),
    ).toEqual({
      ...defaultParsedConfig,
      buyButtonTextNoTrial: 'Unlock',
      buyButtonTextTrial: 'Start trial',
    });
  });

  it('falls back to the default buy button text for empty values', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text_no_trial: '   ',
        buy_button_text_trial: 12,
      }),
    ).toEqual(defaultParsedConfig);
  });

  it('parses non-empty text overrides', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text: 'Custom CTA',
        subtitle_text: 'Custom subtitle',
        title_text: 'Custom title',
      }),
    ).toEqual({
      ...defaultParsedConfig,
      buyButtonText: 'Custom CTA',
      subtitleText: 'Custom subtitle',
      titleText: 'Custom title',
    });
  });

  it('ignores empty, whitespace, null, and non-string text values', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text: '',
        subtitle_text: '   ',
        title_text: null,
      }),
    ).toEqual(defaultParsedConfig);

    expect(
      parsePaywallRemoteConfig({
        buy_button_text: 123,
        subtitle_text: undefined,
        title_text: false,
      }),
    ).toEqual(defaultParsedConfig);
  });

  it('trims whitespace from text overrides', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text: '  Custom CTA  ',
        subtitle_text: '  Custom subtitle  ',
        title_text: '  Custom title  ',
      }),
    ).toEqual({
      ...defaultParsedConfig,
      buyButtonText: 'Custom CTA',
      subtitleText: 'Custom subtitle',
      titleText: 'Custom title',
    });
  });
});
