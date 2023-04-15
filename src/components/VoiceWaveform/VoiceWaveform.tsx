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
        const diffMiddle = Math.abs(middle - index);
        const opacity = 1 - diffMiddle * (2 / numberOfFrames);
        const frameDelay = 15 * diffMiddle;
        const frameMaxHeight = maxHeight - maxHeight * Math.random();

        return (
          <WaveformFrame
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            color={color}
            delay={frameDelay}
            maxHeight={frameMaxHeight > minHeight ? frameMaxHeight : minHeight}
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
