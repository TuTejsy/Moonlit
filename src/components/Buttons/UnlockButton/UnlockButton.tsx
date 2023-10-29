import { useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './UnlockButton.styles';
import { UnlockButtonTheme } from './UnlockButton.types';

interface UnlockButtonPropsTypes extends ViewProps {
  theme?: UnlockButtonTheme;
}

export function UnlockButton({ children, style, theme = 'opacity' }: UnlockButtonPropsTypes) {
  const styleContext = useMemo(() => ({ theme }), [theme]);
  const styles = useMakeStyles(makeStyles, styleContext);

  return (
    <View style={[styles.button, style]}>
      <TextView style={styles.buttonText} type='bold'>
        {children}
      </TextView>
      <Icons.Unlock style={styles.unlockIcon} />
    </View>
  );
}
