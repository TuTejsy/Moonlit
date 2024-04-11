import { memo, useCallback, useMemo } from 'react';
import { ViewProps } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';

import { makeStyles } from './UnlockButton.styles';
import { UnlockButtonTheme } from './UnlockButton.types';

interface UnlockButtonPropsTypes extends ViewProps {
  source: SOURCE;
  tab?: TabEventType;
  theme?: UnlockButtonTheme;
}

export const UnlockButton = memo(
  ({ children, source, style, tab, theme = 'opacity' }: UnlockButtonPropsTypes) => {
    const styleContext = useMemo(() => ({ theme }), [theme]);
    const styles = useMakeStyles(makeStyles, styleContext);

    const { showPaywallModal } = useShowPaywallModal();

    const handleUnlockPress = useCallback(() => {
      showPaywallModal({ contentName: 'Promotion banner', source, tab });
    }, [showPaywallModal, source, tab]);

    return (
      <PressableView style={[styles.button, style]} onPress={handleUnlockPress}>
        <TextView style={styles.buttonText} type='bold'>
          {children}
        </TextView>
        <Icons.Unlock style={styles.unlockIcon} />
      </PressableView>
    );
  },
);
