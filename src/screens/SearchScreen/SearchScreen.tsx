import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './SearchScreen.styles';

function SearchScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.opacityOrange(0.3), colors.black]}
      locations={[0, 1]}
      style={styles.screen}
    />
  );
}

export default SearchScreen;
