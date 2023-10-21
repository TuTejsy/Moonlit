import { NativeModule } from 'react-native/types';

export type AUDIO_RECORDER_FILE = {
  cachedName: string;
  duration: number;
  framesPower: Array<number>;
  mime: string;
  size: number;
};

export enum AUDIO_PLAYER_EMITTER_EVENT {
  PLAYING_DID_FINISH = 'PLAYING_DID_FINISH',
  PLAYING_DID_INTERRUPT = 'PLAYING_DID_INTERRUPT',
}

export enum AUDIO_RECORDER_EMITTER_EVENT {
  RECORDING_DID_FAILED = 'RECORDING_DID_FAILED',
  RECORDING_DID_FINISH = 'RECORDING_DID_FINISH',
  RECORDING_DID_INTERRUPT = 'RECORDING_DID_INTERRUPT',
  RECORDING_DID_START = 'RECORDING_DID_START',
  RECORDING_FRAME_POWER_UPDATE = 'RECORDING_FRAME_POWER_UPDATE',
  RECORDING_NOT_PERMITTED = 'RECORDING_NOT_PERMITTED',
}

export interface AudioRecorderTypes extends NativeModule {
  startAudioRecording: () => void;
  stopAudioRecording: () => Promise<AUDIO_RECORDER_FILE>;
}

export interface AudioPlayerTypes extends NativeModule {
  getCurrentPlayingTime: () => Promise<number>;
  pausePlaying: () => Promise<{ playingTime?: number }>;
  rewindPlayingToTime: (time: number) => Promise<any>;
  setToPlayFile: (fileInfo: {
    coverPath: string;
    filePath: string;
    fileTitle: string;
  }) => Promise<any>;
  startPlayingFromTime: (time: number) => Promise<any>;
  stopPlaying: () => Promise<any>;
}

export interface KeepAwakeTypes extends NativeModule {
  activate: () => void;
  deactivate: () => void;
}
