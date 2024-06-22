import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useWebPagesNavigation } from '@/hooks/navigation/useWebPagesNavigation';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './FooterActions.styles';

interface FooterActionsProps {
  onRestorePress: () => void;
}

export const FooterActions = React.memo(({ onRestorePress }: FooterActionsProps) => {
  const styles = useMakeStyles(makeStyles);

  const { openPrivacyPolicy, openTermsOfService } = useWebPagesNavigation();

  return (
    <View style={styles.actions}>
      <TouchableOpacity onPress={openTermsOfService}>
        <TextView style={styles.action}>Terms</TextView>
      </TouchableOpacity>

      <TouchableOpacity onPress={openPrivacyPolicy}>
        <TextView style={styles.action}>Privacy</TextView>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRestorePress}>
        <TextView style={styles.action}>Restore</TextView>
      </TouchableOpacity>
    </View>
  );
});
