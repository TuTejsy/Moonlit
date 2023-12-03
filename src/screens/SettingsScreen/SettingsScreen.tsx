import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { MenuItem } from './components/MenuItem/MenuItem';
import { PromotionBanner } from './components/PromotionBanner/PromotionBanner';
import { makeStyles } from './SettingsScreen.styles';

export const SettingsScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const isFullVersion = useAppSelector(selectIsFullVersion);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <TextView style={styles.title} type='bold'>
        Settings
      </TextView>

      {!isFullVersion && <PromotionBanner />}

      <MenuItem icon={<Icons.Info />} title='Help & Support' />
      <MenuItem icon={<Icons.Doc />} title='Terms of service' />
      <MenuItem icon={<Icons.Privacy />} title='Privacy policy' />

      <View style={styles.separator} />

      <MenuItem icon={<Icons.Star />} title='Rate App' />
    </LinearGradient>
  );
};
