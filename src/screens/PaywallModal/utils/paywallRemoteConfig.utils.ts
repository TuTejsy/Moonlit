export interface PaywallRemoteConfig {
  showBottomSkipButton: boolean;
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

export function parsePaywallRemoteConfig(
  data?: Record<string, unknown> | null,
): PaywallRemoteConfig {
  return {
    buyButtonText: parseOptionalRemoteConfigString(data?.buy_button_text),
    showBottomSkipButton: data?.show_bottom_skip_button === true,
    subtitleText: parseOptionalRemoteConfigString(data?.subtitle_text),
    titleText: parseOptionalRemoteConfigString(data?.title_text),
  };
}
