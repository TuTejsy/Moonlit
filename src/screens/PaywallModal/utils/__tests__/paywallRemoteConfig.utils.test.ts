import { parsePaywallRemoteConfig } from '../paywallRemoteConfig.utils';

describe('parsePaywallRemoteConfig', () => {
  it('returns defaults when data is missing', () => {
    expect(parsePaywallRemoteConfig()).toEqual({
      showBottomSkipButton: false,
    });
  });

  it('returns defaults when data is null', () => {
    expect(parsePaywallRemoteConfig(null)).toEqual({
      showBottomSkipButton: false,
    });
  });

  it('parses show_bottom_skip_button when true', () => {
    expect(parsePaywallRemoteConfig({ show_bottom_skip_button: true })).toEqual({
      showBottomSkipButton: true,
    });
  });

  it('treats non-true show_bottom_skip_button as false', () => {
    expect(parsePaywallRemoteConfig({ show_bottom_skip_button: false })).toEqual({
      showBottomSkipButton: false,
    });

    expect(parsePaywallRemoteConfig({ show_bottom_skip_button: 'true' })).toEqual({
      showBottomSkipButton: false,
    });
  });

  it('parses non-empty text overrides', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text: 'Custom CTA',
        subtitle_text: 'Custom subtitle',
        title_text: 'Custom title',
      }),
    ).toEqual({
      buyButtonText: 'Custom CTA',
      showBottomSkipButton: false,
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
    ).toEqual({
      showBottomSkipButton: false,
    });

    expect(
      parsePaywallRemoteConfig({
        buy_button_text: 123,
        subtitle_text: undefined,
        title_text: false,
      }),
    ).toEqual({
      showBottomSkipButton: false,
    });
  });

  it('trims whitespace from text overrides', () => {
    expect(
      parsePaywallRemoteConfig({
        buy_button_text: '  Custom CTA  ',
        subtitle_text: '  Custom subtitle  ',
        title_text: '  Custom title  ',
      }),
    ).toEqual({
      buyButtonText: 'Custom CTA',
      showBottomSkipButton: false,
      subtitleText: 'Custom subtitle',
      titleText: 'Custom title',
    });
  });
});
