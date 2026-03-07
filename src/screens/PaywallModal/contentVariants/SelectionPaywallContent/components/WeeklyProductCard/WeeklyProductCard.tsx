import { View } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './WeeklyProductCard.styles';
import { WeeklyProductCardProps } from './WeeklyProductCard.types';

export const WeeklyProductCard = ({
  isSelected,
  onPress,
  secondProductText,
  weeklyPricePerWeekText,
}: WeeklyProductCardProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <PressableView
      style={[styles.productContainer, isSelected && styles.selectedProductContainer]}
      onPress={onPress}
    >
      <TextView style={styles.productTitle}>{secondProductText}</TextView>

      <View style={styles.productPriceContainer}>
        <TextView style={styles.price}>{weeklyPricePerWeekText}</TextView>
        <TextView style={styles.priceSubtitle}>
          {localize('paywall', 'per')} {localize('paywall', 'week')}
        </TextView>
      </View>

      <View style={styles.checkbox}>{isSelected && <View style={styles.checkboxMark} />}</View>
    </PressableView>
  );
};
