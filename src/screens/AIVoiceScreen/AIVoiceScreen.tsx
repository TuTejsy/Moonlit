import React, { memo } from 'react';
import { View } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './AIVoiceScreen.styles';
import type { AIVoiceScreenProps } from './AIVoiceScreen.types';

export const AIVoiceScreen = memo((_props: AIVoiceScreenProps) => {
  const styles = useMakeStyles(makeStyles);

  return <View style={styles.screen} />;
});

AIVoiceScreen.displayName = 'AIVoiceScreen';
