import { View } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './WeeklyProductCard.styles';
import { WeeklyProductCardProps } from './WeeklyProductCard.types';

export const WeeklyProductCard = ({
  isSelected,
  onPress,
  secondProductText,
  weeklyPricePerWeekText,
}: WeeklyProductCardProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <PressableView
      style={[styles.productContainer, isSelected && styles.selectedProductContainer]}
      onPress={onPress}
    >
      <View style={styles.productNameContainer}>
        <TextView style={styles.productTitle}>{secondProductText}</TextView>
        <TextView style={styles.productSubtitle} type='light'>
          {weeklyPricePerWeekText}
        </TextView>
      </View>
    </PressableView>
  );
};
