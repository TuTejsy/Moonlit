import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PlayerState } from './player.types';

export const initialState: PlayerState = {
  isPlaying: false,
  selectedAudioRecordingId: null,
};

export const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    startPlaying: (state, { payload }: PayloadAction<number>) => {
      state.isPlaying = true;
      state.selectedAudioRecordingId = payload;
    },
    stopPlaying: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { startPlaying, stopPlaying } = playerSlice.actions;
