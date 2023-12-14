import React, { memo } from 'react';
import { Image, View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './EmptySearch.styles';
import noSearchResultsImage from './images/noSearchResults/noSearchResults.png';

export const EmptySearch = memo(() => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.container}>
      <Image source={noSearchResultsImage} style={styles.image} />

      <TextView style={styles.text} type='regular'>
        No results{`\n`}for this promt
      </TextView>
    </View>
  );
});
