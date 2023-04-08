/* eslint-disable prefer-destructuring */
import { NativeModules } from 'react-native';

import { AudioRecorderTypes, AudioPlayerTypes, KeepAwakeTypes } from './native-modules.types';

const AudioPlayer: AudioPlayerTypes = NativeModules.ZRKAudioPlayerManager;
const KeepAwake: KeepAwakeTypes = NativeModules.ZRKKeepAwake;
const AudioRecorder: AudioRecorderTypes = NativeModules.ZRKAudioRecorderManager;

export default {
  AudioPlayer,
  AudioRecorder,
  KeepAwake,
};
