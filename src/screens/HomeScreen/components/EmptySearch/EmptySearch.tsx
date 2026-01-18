import React, { memo } from 'react';
import { Image, View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './EmptySearch.styles';
import noSearchResultsImage from './images/noSearchResults/noSearchResults.png';

export const EmptySearch = memo(() => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={styles.container}>
      <Image source={noSearchResultsImage} style={styles.image} />

      <TextView style={styles.text} type='regular'>
        {localize('common', 'noResultForSearch')}
      </TextView>
    </View>
  );
});
