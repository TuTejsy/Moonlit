import { SWITCH_PLACEMENT_ID } from '@/constants/common';

export enum REMOTE_CONFIG_FIELDS {
  BUY_BUTTON_TEXT_NO_TRIAL = 'buy_button_text_no_trial',
  BUY_BUTTON_TEXT_TRIAL = 'buy_button_text_trial',
  PLACEMENT_ID = 'placement_id',
  TOGGLE_STATE = 'toggle_state',
}

export const remoteConfigDefaultValues = {
  [REMOTE_CONFIG_FIELDS.PLACEMENT_ID]: SWITCH_PLACEMENT_ID,
  [REMOTE_CONFIG_FIELDS.TOGGLE_STATE]: false,
  [REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL]: 'Begin your adventure',
  [REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL]: 'Begin your adventure',
};
