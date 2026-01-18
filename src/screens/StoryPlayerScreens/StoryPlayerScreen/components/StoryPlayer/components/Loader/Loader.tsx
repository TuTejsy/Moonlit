import React from 'react';
import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { Spinner } from '@/components/Spinner/Spinner';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './Loader.styles';

export function Loader() {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={styles.loaderContainer}>
      <Spinner />
      <TextView style={styles.text}>{localize('stories', 'loadingStory')}</TextView>
    </View>
  );
}
