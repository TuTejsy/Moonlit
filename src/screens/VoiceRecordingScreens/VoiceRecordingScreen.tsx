import React, { useCallback, useEffect, useState } from 'react';
import { Button, View, StyleSheet, NativeEventEmitter, EmitterSubscription } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNFS from 'react-native-fs';
import { useSharedValue } from 'react-native-reanimated';

import VoiceWaveform from '@/components/VoiceWaveform/VoiceWaveform';
import { SANDBOX } from '@/constants/common';
import { audioRecorder } from '@/native-modules/native-modules';
import {
  AUDIO_RECORDER_EMITTER_EVENT,
  AUDIO_RECORDER_FILE,
} from '@/native-modules/native-modules.types';

const UPLOAD_PATH = 'http://localhost:8080/uploadFile';

function VoiceRecordingScreen() {
  const voicePowerSharedValue = useSharedValue(4);
  const [isRecording, setIsRecording] = useState(false);
  const [file, setFile] = useState<AUDIO_RECORDER_FILE | null>(null);

  const handleRecordPress = useCallback(() => {
    if (isRecording) {
      audioRecorder.stopAudioRecording().then((file) => setFile(file));
      setIsRecording(false);
    } else {
      audioRecorder.startAudioRecording();
      setIsRecording(true);
    }
  }, [isRecording]);

  const handleUploadFilePress = useCallback(() => {
    if (!file) {
      return;
    }

    const upload = (response) => {
      const { jobId } = response;
      console.log(`UPLOAD HAS BEGUN! JobId: ${jobId}`);
    };

    const uploadProgress = (response) => {
      const percentage = Math.floor(
        (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
      );
      console.log(`UPLOAD IS ${percentage}% DONE!`);
    };

    console.log(`${SANDBOX.DOCUMENTS.VOICE}/${file.cachedName}`);
    // upload files
    RNFS.uploadFiles({
      files: [
        {
          filename: file.cachedName,
          filepath: `${SANDBOX.DOCUMENTS.VOICE}/${file.cachedName}`,
          filetype: file.mime,
          name: `voice`,
        },
      ],
      headers: {
        Accept: 'application/json',
      },
      method: 'POST',
      progress: uploadProgress,
      toUrl: UPLOAD_PATH,
    })
      .promise.then((response) => {
        if (response.statusCode === 200) {
          console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
        } else {
          console.log('SERVER ERROR');
        }
      })
      .catch((err) => {
        if (err.description === 'cancelled') {
          // cancelled by user
        }
        console.log(err);
      });
  }, [file]);

  useEffect(() => {
    const emitterManager = new NativeEventEmitter(audioRecorder);
    const audioRecorderDidStartSubscription: EmitterSubscription = emitterManager.addListener(
      AUDIO_RECORDER_EMITTER_EVENT.RECORDING_FRAME_POWER_UPDATE,
      (framePower: number) => {
        voicePowerSharedValue.value = framePower;
      },
    );

    return () => {
      audioRecorderDidStartSubscription?.remove();
    };
  }, []);

  return (
    <View style={styles.content}>
      <VoiceWaveform
        maxHeight={44}
        minHeight={8}
        numberOfFrames={20}
        voicePowerSharedValue={voicePowerSharedValue}
      />

      <View style={styles.buttons}>
        <Button title={isRecording ? 'Stop Recording' : 'Record'} onPress={handleRecordPress} />
        <Button title='Upload File' onPress={handleUploadFilePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 200,
  },
  content: {
    alignItems: 'center',
    backgroundColor: Colors.darker,
    flex: 1,
    justifyItems: 'center',
    paddingTop: 200,
  },
});

export default VoiceRecordingScreen;
