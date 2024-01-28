import { NativeModule, TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule, NativeModule {
  getCurrentState: () => { filePath: string; isPlaying: boolean; playingTime: number };
  pausePlaying: () => { playingTime?: number };
  rewindPlayingToTime: (time: number) => boolean;
  setToPlayFile: (fileInfo: { coverPath: string; filePath: string; fileTitle: string }) => boolean;
  startPlayingFromTime: (time: number) => boolean;
  stopPlaying: () => boolean;
}

export const audioPlayer = TurboModuleRegistry.get<Spec>('MNTAudioPlayerManager') || undefined;

export enum AUDIO_PLAYER_EMITTER_EVENT {
  PLAYING_DID_FINISH = 'PLAYING_DID_FINISH',
  PLAYING_DID_INTERRUPT = 'PLAYING_DID_INTERRUPT',
}
