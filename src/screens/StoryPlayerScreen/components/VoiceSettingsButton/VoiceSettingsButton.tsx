import React from 'react';

import { BlurView } from '@react-native-community/blur';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useInitTheme } from '@/hooks/theme/useInitTheme';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './VoiceSettingsButton.styles';

function VoiceSettingsButton() {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useInitTheme();

  return (
    <BlurView
      blurAmount={5}
      blurType='dark'
      reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
      style={styles.button}
    >
      <TextView bold style={styles.text}>
        Voice settings
      </TextView>

      <Icons.Waveframe />
    </BlurView>
  );
}

export default VoiceSettingsButton;
