import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserState } from './user.types';

export const initialState: UserState = {
  freeOfferDays: 3,
  isFullVersion: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    lockFullVersion: (state) => {
      state.isFullVersion = false;
    },
    setFreeOfferDays: (state, { payload }: PayloadAction<number>) => {
      state.freeOfferDays = payload;
    },
    unlockFullVersion: (state) => {
      state.isFullVersion = true;
    },
  },
});

export const { lockFullVersion, setFreeOfferDays, unlockFullVersion } = userSlice.actions;
