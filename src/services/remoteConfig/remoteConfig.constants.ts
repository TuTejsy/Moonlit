export enum REMOTE_CONFIG_FIELDS {
  BUY_BUTTON_TEXT_NO_TRIAL = 'buy_button_text_no_trial',
  BUY_BUTTON_TEXT_TRIAL = 'buy_button_text_trial',
  SEGMENT = 'segment',
  TOGGLE_STATE = 'toggle_state',
}

export const remoteConfigDefaultValues = {
  [REMOTE_CONFIG_FIELDS.TOGGLE_STATE]: false,
  [REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL]: 'Begin your adventure',
  [REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL]: 'Begin your adventure',
  [REMOTE_CONFIG_FIELDS.SEGMENT]: 'no segment',
};
