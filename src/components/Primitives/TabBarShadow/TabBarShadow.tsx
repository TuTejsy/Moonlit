import React from 'react';

import Animated from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './TabBarShadow.styles';

export const TabBarShadow = () => {
  const styles = useMakeStyles(makeStyles);

  return <Animated.View style={styles.view} />;
};
