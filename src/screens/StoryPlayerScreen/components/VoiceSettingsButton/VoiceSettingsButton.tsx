import React from 'react';
import { View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './VoiceSettingsButton.styles';

function VoiceSettingsButton() {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.button}>
      <TextView bold style={styles.text}>
        Voice settings
      </TextView>

      <Icons.Waveframe />
    </View>
  );
}

export default VoiceSettingsButton;
