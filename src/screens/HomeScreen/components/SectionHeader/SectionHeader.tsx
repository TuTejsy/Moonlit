import React from 'react';
import { View, ViewProps } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './SectionHeader.styles';
import { useAppLocalization } from '@/localization/useAppLocalization';

interface SectionHeaderPropTypes extends ViewProps {
  onSeeAllPress: () => void;
  title: string;
}

export const SectionHeader = ({
  onSeeAllPress,
  style,
  title,
  ...props
}: SectionHeaderPropTypes) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={[styles.sectionHeaderContainer, style]} {...props}>
      <TextView style={styles.titleText} type='bold'>
        {title}
      </TextView>
      <TouchableOpacity onPress={onSeeAllPress}>
        <TextView style={styles.seeAllText}>{localize('common', 'seeAll')}</TextView>
      </TouchableOpacity>
    </View>
  );
};
