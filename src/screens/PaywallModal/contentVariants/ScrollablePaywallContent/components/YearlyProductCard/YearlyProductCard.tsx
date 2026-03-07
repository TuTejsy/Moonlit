import { View, Image } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

// eslint-disable-next-line import/no-unresolved
import yearlyProductBackgroundImage from '../../images/yearlyProductBackground/yearlyProductBackground.png';

import { makeStyles } from './YearlyProductCard.styles';
import { YearlyProductCardProps } from './YearlyProductCard.types';

export const YearlyProductCard = ({
  isSelected,
  onPress,
  pricesDiffInPercentsText,
  yearlyPricePerWeekText,
}: YearlyProductCardProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <PressableView
      style={[styles.productContainer, isSelected && styles.selectedProductContainer]}
      onPress={onPress}
    >
      <Image source={yearlyProductBackgroundImage} style={styles.productContainerImage} />

      <View style={styles.productNameContainer}>
        <TextView style={styles.productTitle}>{localize('paywall', 'YEARLY')}</TextView>
        <TextView style={styles.productSubtitle} type='light'>
          {yearlyPricePerWeekText}
        </TextView>
      </View>

      <View style={styles.separator} />

      <View style={styles.productPriceContainer}>
        <TextView style={styles.priceSubtitle}>{localize('paywall', 'save')}</TextView>
        <TextView style={styles.priceSale} type='bold'>
          {pricesDiffInPercentsText}
        </TextView>
      </View>
    </PressableView>
  );
};
