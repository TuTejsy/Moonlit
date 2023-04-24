import React from 'react';
import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './SectionHeader.styles';

interface SectionHeaderPropTypes {
  onSeeAllPress: () => void;
  title: string;
}

function SectionHeader({ onSeeAllPress, title }: SectionHeaderPropTypes) {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.sectionHeaderContainer}>
      <TextView bold style={styles.titleText}>
        {title}
      </TextView>
      <TextView style={styles.seeAllText} onPress={onSeeAllPress}>
        See all
      </TextView>
    </View>
  );
}

export default SectionHeader;
