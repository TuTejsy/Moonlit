import React from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useWebPagesNavigation } from '@/hooks/navigation/useWebPagesNavigation';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './FooterActions.styles';

interface FooterActionsProps {
  onRestorePress: () => void;
  actionStyle?: TextStyle;
  style?: ViewStyle;
}

export const FooterActions = React.memo(
  ({ actionStyle, onRestorePress, style }: FooterActionsProps) => {
    const styles = useMakeStyles(makeStyles);
    const { localize } = useAppLocalization();

    const { openPrivacyPolicy, openTermsOfService } = useWebPagesNavigation();

    return (
      <View style={[styles.actions, style]}>
        <TouchableOpacity onPress={openTermsOfService}>
          <TextView style={[styles.action, actionStyle]}>{localize('common', 'terms')}</TextView>
        </TouchableOpacity>

        <TouchableOpacity onPress={openPrivacyPolicy}>
          <TextView style={[styles.action, actionStyle]}>{localize('common', 'privacy')}</TextView>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRestorePress}>
          <TextView style={[styles.action, actionStyle]}>{localize('common', 'restore')}</TextView>
        </TouchableOpacity>
      </View>
    );
  },
);
