import React from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useWebPagesNavigation } from '@/hooks/navigation/useWebPagesNavigation';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './FooterActions.styles';

interface FooterActionsProps {
  onRestorePress: () => void;
  actionStyle?: TextStyle;
  style?: ViewStyle;
}

export const FooterActions = React.memo(
  ({ actionStyle, onRestorePress, style }: FooterActionsProps) => {
    const styles = useMakeStyles(makeStyles);

    const { openPrivacyPolicy, openTermsOfService } = useWebPagesNavigation();

    return (
      <View style={[styles.actions, style]}>
        <TouchableOpacity onPress={openTermsOfService}>
          <TextView style={[styles.action, actionStyle]}>Terms</TextView>
        </TouchableOpacity>

        <TouchableOpacity onPress={openPrivacyPolicy}>
          <TextView style={[styles.action, actionStyle]}>Privacy</TextView>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRestorePress}>
          <TextView style={[styles.action, actionStyle]}>Restore</TextView>
        </TouchableOpacity>
      </View>
    );
  },
);
