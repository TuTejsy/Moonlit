import { View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './BenefitsList.styles';

export const BenefitsList = () => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={styles.benefitsContainer}>
      <View style={styles.benefit}>
        <Icons.Crown />
        <TextView style={styles.benefitText} type='medium'>
          {localize('paywall', 'richCollectionOfFairyTails')}
        </TextView>
      </View>
      <View style={styles.benefit}>
        <Icons.Record />
        <TextView style={styles.benefitText} type='medium'>
          {localize('paywall', 'uniqueCustomVoices')}
        </TextView>
      </View>
      <View style={styles.benefit}>
        <Icons.MicSmall />
        <TextView style={styles.benefitText} type='medium'>
          {localize('paywall', 'yourPersonalizedVoices')}
        </TextView>
      </View>
      <View style={styles.benefit}>
        <Icons.DownloadSmall />
        <TextView style={styles.benefitText} type='medium'>
          {localize('paywall', 'offlineModePlayer')}
        </TextView>
      </View>
    </View>
  );
};
