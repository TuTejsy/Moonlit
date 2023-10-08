import React from 'react';
import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { Spinner } from '@/components/Spinner/Spinner';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './Loader.styles';

function VoiceSettingsButton() {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.loaderContainer}>
      <Spinner />
      <TextView style={styles.text}>Give us a second to load your story</TextView>
    </View>
  );
}

export default VoiceSettingsButton;
