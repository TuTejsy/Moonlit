import { localization } from '@/localization/localization';

export interface PaywallRemoteConfig {
  buyButtonTextNoTrial: string;
  buyButtonTextTrial: string;
  showBottomSkipButton: boolean;
  toggleState: boolean;
  buyButtonText?: string;
  subtitleText?: string;
  titleText?: string;
}

function parseOptionalRemoteConfigString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function parseBuyButtonText(value: unknown): string {
  return (
    parseOptionalRemoteConfigString(value) ??
    localization.translate('promotion', 'beginYourAdventure')
  );
}

export function parsePaywallRemoteConfig(
  data?: Record<string, unknown> | null,
): PaywallRemoteConfig {
  const buyButtonText = parseOptionalRemoteConfigString(data?.buy_button_text);
  const subtitleText = parseOptionalRemoteConfigString(data?.subtitle_text);
  const titleText = parseOptionalRemoteConfigString(data?.title_text);

  return {
    ...(buyButtonText !== undefined ? { buyButtonText } : {}),
    buyButtonTextNoTrial: parseBuyButtonText(data?.buy_button_text_no_trial),
    buyButtonTextTrial: parseBuyButtonText(data?.buy_button_text_trial),
    showBottomSkipButton: data?.show_bottom_skip_button === true,
    ...(subtitleText !== undefined ? { subtitleText } : {}),
    ...(titleText !== undefined ? { titleText } : {}),
    toggleState: data?.toggle_state === true,
  };
}
