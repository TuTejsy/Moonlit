import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './user.types';

export const initialState: UserState = {
  isFullVersion: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    lockFullVersion: (state) => {
      state.isFullVersion = false;
    },
    unlockFullVersion: (state) => {
      state.isFullVersion = true;
    },
  },
});

export const { lockFullVersion, unlockFullVersion } = userSlice.actions;
