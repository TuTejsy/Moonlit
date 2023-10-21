import React, { memo } from 'react';
import { Image, View } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import moreVoicesCommingImage from './images/moreVoicesComming/moreVoicesComming.png';
import { makeStyles } from './MoreVoicesPlaceholder.styles';

export const MoreVoicesPlaceholder = memo(() => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.audioRecordingContainer}>
      <Image source={moreVoicesCommingImage} style={styles.image} />
    </View>
  );
});
