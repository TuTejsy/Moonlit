import { NativeEventEmitter } from 'react-native/types';

export type AUDIO_RECORDER_FILE = {
  cachedName: string;
  duration: number;
  framesPower: Array<number>;
  mime: string;
  size: number;
};

export interface AudioRecorderTypes extends NativeEventEmitter {
  startAudioRecording: () => void;
  stopAudioRecording: () => Promise<AUDIO_RECORDER_FILE>;
}

export interface AudioPlayerTypes extends NativeEventEmitter {
  pausePlaying: () => Promise<{ playingTime?: number }>;
  rewindPlayingToTime: (time: number) => Promise<any>;
  setToPlayFileAtPath: (path: string) => Promise<any>;
  startPlayingFromTime: (time: number) => Promise<any>;
  stopPlaying: () => Promise<any>;
}

export interface KeepAwakeTypes {
  activate: () => void;
  deactivate: () => void;
}
