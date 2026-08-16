import React from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './ProdPlanRow.styles';
import type { ProdPlanRowProps } from './ProdPlanRow.types';

const SELECTED_GRADIENT_COLORS = ['rgba(148,56,165,0.5)', 'rgba(43,18,48,0.5)'];
const SELECTED_GRADIENT_START = { x: 0, y: 0.5 };
const SELECTED_GRADIENT_END = { x: 1, y: 0.5 };

export const ProdPlanRow = ({
  badgeLabel,
  detail,
  isSelected,
  name,
  onPress,
  price,
  priceUnit,
  testID,
}: ProdPlanRowProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.wrap}>
      {badgeLabel !== undefined ? (
        <View style={styles.badge}>
          <View style={styles.badgeSheen} />
          <TextView style={styles.badgeLabel}>{badgeLabel}</TextView>
        </View>
      ) : null}

      <PressableView
        accessibilityRole='radio'
        accessibilityState={{ selected: isSelected }}
        style={[styles.container, isSelected ? styles.selected : styles.unselected]}
        testID={testID}
        onPress={onPress}
      >
        {isSelected ? (
          <LinearGradient
            colors={SELECTED_GRADIENT_COLORS}
            end={SELECTED_GRADIENT_END}
            start={SELECTED_GRADIENT_START}
            style={styles.selectedGradientOverlay}
          />
        ) : null}

        <View style={styles.left}>
          <TextView style={styles.name}>{name}</TextView>
          <TextView style={styles.detail}>{detail}</TextView>
        </View>

        <View style={styles.priceRow}>
          <TextView style={styles.price}>{price}</TextView>
          <TextView style={styles.priceUnit}>{priceUnit}</TextView>
        </View>
      </PressableView>
    </View>
  );
};
