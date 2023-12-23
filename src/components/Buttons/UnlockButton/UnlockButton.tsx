import { memo, useMemo } from 'react';
import { ViewProps } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './UnlockButton.styles';
import { UnlockButtonTheme } from './UnlockButton.types';

interface UnlockButtonPropsTypes extends ViewProps {
  theme?: UnlockButtonTheme;
}

export const UnlockButton = memo(
  ({ children, style, theme = 'opacity' }: UnlockButtonPropsTypes) => {
    const styleContext = useMemo(() => ({ theme }), [theme]);
    const styles = useMakeStyles(makeStyles, styleContext);

    const { showPaywallModal } = useShowPaywallModal();

    return (
      <PressableView style={[styles.button, style]} onPress={showPaywallModal}>
        <TextView style={styles.buttonText} type='bold'>
          {children}
        </TextView>
        <Icons.Unlock style={styles.unlockIcon} />
      </PressableView>
    );
  },
);
