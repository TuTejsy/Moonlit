import React from 'react';
import { View } from 'react-native';

import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './ProdTrialCard.styles';
import type { ProdTrialCardProps } from './ProdTrialCard.types';
import { useProdTrialCardAnimation } from './useProdTrialCardAnimation';

const DEFAULT_TRIAL_DAYS = 3;

export const ProdTrialCard = ({
  dueTodayText,
  enabled,
  onToggle,
  trialDays,
}: ProdTrialCardProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();
  const { colors } = useTheme();

  const { indicatorStyle, setStripContentHeight, stripStyle, surfaceStyle } =
    useProdTrialCardAnimation(enabled, {
      borderOff: colors.opacityWhite(0.2),
      borderOn: colors.pink,
      indicatorBgOff: colors.opacityWhite(0),
      indicatorBgOn: colors.pink,
      surfaceOff: colors.opacityPink(0),
      surfaceOn: colors.opacityPink(0.1),
    });

  const days = trialDays ?? DEFAULT_TRIAL_DAYS;

  const daysFreeLabel = localize('paywall', 'staticDefaultProdDaysFree', { count: days });

  return (
    <PressableView
      accessibilityRole='switch'
      accessibilityState={{ checked: enabled }}
      testID='prod-trial-card'
      onPress={onToggle}
    >
      <Animated.View style={[styles.container, surfaceStyle]}>
        <View style={styles.row}>
          <Animated.View style={[styles.checkIndicator, indicatorStyle]}>
            {enabled ? (
              <Svg fill='none' height={14} viewBox='0 0 24 24' width={14}>
                <Path
                  d='M20 6L9 17L4 12'
                  stroke={colors.white}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2.5}
                />
              </Svg>
            ) : null}
          </Animated.View>

          <View style={styles.textColumn}>
            <TextView style={styles.title}>
              {enabled
                ? localize('paywall', 'staticDefaultProdTrialCardOnTitle')
                : localize('paywall', 'staticDefaultProdTrialCardOffTitle')}
            </TextView>
            <TextView style={styles.subtitle}>
              {enabled
                ? localize('paywall', 'staticDefaultProdTrialCardOnSubtitle')
                : localize('paywall', 'staticDefaultProdTrialCardOffSubtitle')}
            </TextView>
          </View>
        </View>

        <Animated.View
          accessibilityElementsHidden={!enabled}
          importantForAccessibility={enabled ? 'auto' : 'no-hide-descendants'}
          pointerEvents={enabled ? 'auto' : 'none'}
          style={[styles.stripWrapper, stripStyle]}
        >
          <View
            style={styles.stripInner}
            onLayout={(event) => {
              setStripContentHeight(event.nativeEvent.layout.height);
            }}
          >
            <View style={styles.divider} />
            <View style={styles.strip}>
              <TextView style={styles.stripDueToday}>{dueTodayText}</TextView>
              <TextView style={styles.stripDot}>·</TextView>
              <TextView style={styles.stripDaysFree}>{daysFreeLabel}</TextView>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </PressableView>
  );
};
