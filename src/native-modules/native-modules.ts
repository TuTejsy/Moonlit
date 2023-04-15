/* eslint-disable prefer-destructuring */
import { NativeModules } from 'react-native';

import { AudioRecorderTypes, AudioPlayerTypes, KeepAwakeTypes } from './native-modules.types';

const audioPlayer: AudioPlayerTypes = NativeModules.ZRKAudioPlayerManager;
const keepAwake: KeepAwakeTypes = NativeModules.ZRKKeepAwake;
const audioRecorder: AudioRecorderTypes = NativeModules.ZRKAudioRecorderManager;

export { audioPlayer, audioRecorder, keepAwake };
