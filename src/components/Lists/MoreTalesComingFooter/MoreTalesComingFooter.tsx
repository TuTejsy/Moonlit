import { useCallback } from 'react';
import { Image, ViewProps, View } from 'react-native';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { GradientTextView } from '@/components/Primitives/GradientTextView/GradientTextView';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';

// eslint-disable-next-line import/no-unresolved
import moreTalesComingBackgroundImage from './images/moreTalesComingBackground/moreTalesComingBackground.png';
// eslint-disable-next-line import/no-unresolved
import moreTalesComingLogoImage from './images/moreTalesComingLogo/moreTalesComingLogo.png';
import { makeStyles } from './MoreTalesComingFooter.styles';

interface MoreTalesComingFooterProps extends ViewProps {
  source: SOURCE;
  tab?: TabEventType;
}

export const MoreTalesComingFooter = ({ source, style, tab }: MoreTalesComingFooterProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const { isFullVerion, showPaywallModal } = useShowPaywallModal();

  const handleUnlockPress = useCallback(() => {
    showPaywallModal({ contentName: 'More Moonlit tales comming soon', source, tab });
  }, [showPaywallModal, source, tab]);

  return (
    <View style={[styles.container, style]}>
      <Image source={moreTalesComingBackgroundImage} style={styles.backgroundImage} />

      <Image source={moreTalesComingLogoImage} style={styles.logoImage} />
      <GradientTextView
        useAngle
        angle={93}
        colors={[colors.opacityWhite(1), colors.opacityWhite(0.5)]}
        locations={[0.02, 0.98]}
        style={styles.title}
        type='bold'
      >
        More Moonlit tales{'\n'}coming soon
      </GradientTextView>

      {!isFullVerion && (
        <GradientButton style={styles.button} onPress={handleUnlockPress}>
          Begin your adventure
        </GradientButton>
      )}
    </View>
  );
};
