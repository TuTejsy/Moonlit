import React from 'react';
import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './VoiceTipsCard.styles';
import { VoiceTipsCardProps } from './VoiceTipsCard.types';

export const VoiceTipsCard = (_props: VoiceTipsCardProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={styles.tipsCard}>
      <View style={styles.tipRow}>
        <View style={styles.tipDot} />
        <TextView style={styles.tipText}>{localize('createVoice', 'tipQuietPlace')}</TextView>
      </View>
      <View style={styles.tipRow}>
        <View style={styles.tipDot} />
        <TextView style={styles.tipText}>{localize('createVoice', 'tipSpeakNaturally')}</TextView>
      </View>
      <View style={[styles.tipRow, styles.tipRowLast]}>
        <View style={styles.tipDot} />
        <TextView style={styles.tipText}>{localize('createVoice', 'tipHoldPhone')}</TextView>
      </View>
    </View>
  );
};
