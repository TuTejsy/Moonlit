import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useWebPagesNavigation } from '@/hooks/navigation/useWebPagesNavigation';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './FooterActions.styles';

interface FooterActionsProps {
  onRestorePress: () => void;
  actionStyle?: TextStyle;
  onSkipPress?: () => void;
  style?: ViewStyle;
}

export const FooterActions = React.memo(
  ({ actionStyle, onRestorePress, onSkipPress, style }: FooterActionsProps) => {
    const styles = useMakeStyles(makeStyles);
    const { localize } = useAppLocalization();

    const { openPrivacyPolicy, openTermsOfService } = useWebPagesNavigation();

    return (
      <View style={[styles.actions, style]}>
        {onSkipPress ? (
          <PressableView onPress={onSkipPress}>
            <TextView style={[styles.action, actionStyle]}>{localize('common', 'skip')}</TextView>
          </PressableView>
        ) : null}

        <PressableView onPress={openTermsOfService}>
          <TextView style={[styles.action, actionStyle]}>{localize('common', 'terms')}</TextView>
        </PressableView>

        <PressableView onPress={openPrivacyPolicy}>
          <TextView style={[styles.action, actionStyle]}>{localize('common', 'privacy')}</TextView>
        </PressableView>

        <PressableView onPress={onRestorePress}>
          <TextView style={[styles.action, actionStyle]}>{localize('common', 'restore')}</TextView>
        </PressableView>
      </View>
    );
  },
);
