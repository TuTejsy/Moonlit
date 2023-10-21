import pipe from 'lodash/fp/pipe';

import { RootState } from '../store';

const playerSelector = (state: RootState) => state.player;

export const selectIsPlaying = pipe(playerSelector, (state) => state.isPlaying);
export const selectSelectedAudioRecoringId = pipe(
  playerSelector,
  (state) => state.selectedAudioRecordingId,
);
