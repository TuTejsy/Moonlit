import { useCallback } from 'react';
import { Linking, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { openComposer } from 'react-native-email-link';
import InAppReview from 'react-native-in-app-review';
import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { MOONLIT_IOS_APP_LINK, SUPPORT_EMAIL } from '@/constants/common';
import { useWebPagesNavigation } from '@/hooks/navigation/useWebPagesNavigation';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useDevMode } from '@/hooks/useDevMode';
import { AnalyticsService } from '@/services/analytics/analytics';
import { getStorageData, storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { MenuItem } from './components/MenuItem/MenuItem';
import { PromotionBanner } from './components/PromotionBanner/PromotionBanner';
import { makeStyles } from './SettingsScreen.styles';

export const SettingsScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const isFullVersion = useAppSelector(selectIsFullVersion);

  const { openPrivacyPolicy, openTermsOfService } = useWebPagesNavigation();
  const { onDevModePress, renderDevModeDialog } = useDevMode();

  const handleHelpAndSupportPress = useCallback(() => {
    openComposer({
      defaultEmailLabel: 'Mail',
      to: SUPPORT_EMAIL,
    }).catch((error: Error) => {
      if (error?.message === 'No email apps available') {
        Linking.openURL('https://apps.apple.com/app/mail/id1108187098');
      }
    });
  }, []);

  const handleRateAppPress = useCallback(() => {
    if (getStorageData().isReviewAsked) {
      Linking.openURL(MOONLIT_IOS_APP_LINK);
    } else {
      InAppReview.RequestInAppReview()
        .then(
          (reviewShown) => {
            if (!reviewShown) {
              Linking.openURL(MOONLIT_IOS_APP_LINK);
            }
          },
          () => {
            Linking.openURL(MOONLIT_IOS_APP_LINK);
          },
        )
        .catch((err) => {
          Linking.openURL(MOONLIT_IOS_APP_LINK);
        })
        .finally(() => {
          storage.set(StorageKeys.isReviewAsked, true);
        });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      AnalyticsService.logSettingsViewEvent();
    }, []),
  );

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <TextView style={styles.title} type='bold' onPress={onDevModePress}>
        Settings
      </TextView>

      {!isFullVersion && <PromotionBanner />}

      <MenuItem icon={<Icons.Info />} title='Contact us' onPress={handleHelpAndSupportPress} />
      <MenuItem icon={<Icons.Doc />} title='Terms of service' onPress={openTermsOfService} />
      <MenuItem icon={<Icons.Privacy />} title='Privacy policy' onPress={openPrivacyPolicy} />

      <View style={styles.separator} />

      <MenuItem icon={<Icons.Star />} title='Rate App' onPress={handleRateAppPress} />

      {renderDevModeDialog()}
    </LinearGradient>
  );
};
