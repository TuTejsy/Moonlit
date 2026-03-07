import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './YearlyProductCard.styles';
import { YearlyProductCardProps } from './YearlyProductCard.types';

export const YearlyProductCard = ({
  isSelected,
  onPress,
  yearlyPricePerWeekText,
  yearlyPriceText,
  yearlyProductBenifitText,
}: YearlyProductCardProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();

  return (
    <PressableView
      style={[styles.productContainer, isSelected && styles.selectedProductContainer]}
      onPress={onPress}
    >
      <LinearGradient
        useAngle
        angle={276}
        colors={[colors.gradientPinkStart, colors.gradientPinkEnd]}
        locations={[0, 1]}
        style={styles.fullBenifitLabel}
      >
        <TextView style={styles.fullBenifitLabelText}>{yearlyProductBenifitText}</TextView>
      </LinearGradient>

      <View style={styles.productNameContainer}>
        <TextView style={styles.productSubtitle} type='light'>
          {localize('paywall', 'YEARLY')} {localize('paywall', 'ACCESS')}
        </TextView>
        <TextView style={styles.productDescription}>
          {localize('paywall', 'just')} {yearlyPriceText} {localize('paywall', 'per')}{' '}
          {localize('paywall', 'year')}{' '}
        </TextView>
      </View>

      <View style={styles.productPriceContainer}>
        <TextView style={styles.price}>{yearlyPricePerWeekText}</TextView>
        <TextView style={styles.priceSubtitle}>
          {localize('paywall', 'per')} {localize('paywall', 'week')}
        </TextView>
      </View>

      <View style={styles.checkbox}>{isSelected && <View style={styles.checkboxMark} />}</View>
    </PressableView>
  );
};
