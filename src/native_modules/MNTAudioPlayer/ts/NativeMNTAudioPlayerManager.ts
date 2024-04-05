import { TurboModule, TurboModuleRegistry, NativeModule } from 'react-native';

export interface Spec extends TurboModule {
  getCurrentState: () => { filePath: string; isPlaying: boolean; playingTime: number };
  pausePlaying: () => { playingTime?: number };
  rewindPlayingToTime: (time: number) => boolean;
  setToPlayFile: (fileInfo: { coverPath: string; filePath: string; fileTitle: string }) => boolean;
  startPlayingFromTime: (time: number) => boolean;
  stopPlaying: () => boolean;
}

export const audioPlayer =
  (TurboModuleRegistry.get<Spec>('MNTAudioPlayerManager') as Spec & NativeModule) || undefined;

export enum AUDIO_PLAYER_EMITTER_EVENT {
  PLAYING_DID_FINISH = 'PLAYING_DID_FINISH',
  PLAYING_DID_INTERRUPT = 'PLAYING_DID_INTERRUPT',
  PLAYING_DID_PAUSE = 'PLAYING_DID_PAUSE',
  PLAYING_DID_START = 'PLAYING_DID_START',
}

export default audioPlayer;
