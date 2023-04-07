import React, { useMemo } from 'react';
import { View } from 'react-native';

import { SharedValue } from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { commonColors } from '@/styles/themes/common';

import WaveformFrame from './components/WaveformFrame/WaveformFrame';
import { makeStyles } from './VoiceWaveform.styles';

interface VoiceWaveformPropTypes {
  maxHeight: number;
  minHeight: number;
  numberOfFrames: number;
  voicePowerSharedValue: SharedValue<number>;
  color?: string;
}

function VoiceWaveform({
  numberOfFrames,
  maxHeight,
  minHeight,
  voicePowerSharedValue,
  color = commonColors.white,
}: VoiceWaveformPropTypes) {
  const styles = useMakeStyles(makeStyles, { maxHeight });

  const frames = useMemo(() => Array(numberOfFrames).fill(true), [numberOfFrames]);

  return (
    <View style={styles.voiceWaveform}>
      {frames.map((value, index) => {
        const middle = numberOfFrames / 2;
        const opacity = 1 - Math.abs(middle - index) * (2 / numberOfFrames);

        return (
          <WaveformFrame
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            color={color}
            index={index}
            maxHeight={maxHeight}
            minHeight={minHeight}
            opacity={opacity}
            voicePowerSharedValue={voicePowerSharedValue}
          />
        );
      })}
    </View>
  );
}

export default React.memo(VoiceWaveform);
