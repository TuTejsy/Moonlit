import { NativeModule, TurboModule, TurboModuleRegistry } from 'react-native';

import { IS_IOS } from '@/constants/common';

export interface StopRecordingResult {
  cachedName: string;
  duration: number;
  framesPower: number[];
  mime: string;
  size: number;
}

export interface Spec extends TurboModule {
  startAudioRecording: () => void;
  stopAudioRecording: () => Promise<StopRecordingResult>;
}

export enum AUDIO_RECORDER_EMITTER_EVENT {
  RECORDING_DID_FINISH = 'RECORDING_DID_FINISH',
  RECORDING_DID_INTERRUPT = 'RECORDING_DID_INTERRUPT',
  RECORDING_DID_START = 'RECORDING_DID_START',
  RECORDING_FRAME_POWER_UPDATE = 'RECORDING_FRAME_POWER_UPDATE',
  RECORDING_NOT_PERMITTED = 'RECORDING_NOT_PERMITTED',
}

export const audioRecorder = IS_IOS
  ? (TurboModuleRegistry.get<Spec>('MNTAudioRecorderManager') as Spec & NativeModule)
  : undefined;

export default audioRecorder;
