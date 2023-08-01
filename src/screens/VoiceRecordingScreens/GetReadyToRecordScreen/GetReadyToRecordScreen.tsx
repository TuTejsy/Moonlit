import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './GetReadyToRecordScreen.styles';

function GetReadyToRecordScreen() {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  return (
    <LinearGradient
      angle={180}
      colors={[colors.opacityOrange(1), colors.opacityOrange(0)]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <View>
        <TextView>Continue</TextView>
      </View>
    </LinearGradient>
  );
}

export default GetReadyToRecordScreen;
