import { View, ViewProps } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './UnlockButton.styles';

interface UnlockButtonPropsTypes extends ViewProps {}

export function UnlockButton({ children, style }: UnlockButtonPropsTypes) {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={[styles.button, style]}>
      <TextView style={styles.buttonText} type='bold'>
        {children}
      </TextView>
      <Icons.Unlock style={styles.unlockIcon} />
    </View>
  );
}
