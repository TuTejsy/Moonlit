import React from 'react';
import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './SectionHeader.styles';

interface SectionHeaderPropTypes {
  onSeeAllPress: () => void;
  title: string;
}

export const SectionHeader = ({ onSeeAllPress, title }: SectionHeaderPropTypes) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.sectionHeaderContainer}>
      <TextView style={styles.titleText} type='bold'>
        {title}
      </TextView>
      <TextView style={styles.seeAllText} onPress={onSeeAllPress}>
        See all
      </TextView>
    </View>
  );
};
