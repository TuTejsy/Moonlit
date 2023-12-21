import { memo, useCallback, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { makeStyles } from './UnlockButton.styles';
import { UnlockButtonTheme } from './UnlockButton.types';

interface UnlockButtonPropsTypes extends ViewProps {
  theme?: UnlockButtonTheme;
}

export const UnlockButton = memo(
  ({ children, style, theme = 'opacity' }: UnlockButtonPropsTypes) => {
    const styleContext = useMemo(() => ({ theme }), [theme]);
    const styles = useMakeStyles(makeStyles, styleContext);

    const navigation = useAppNavigation();

    const handleBannerPress = useCallback(() => {
      navigation.navigate(RootRoutes.PAYWALL_MODAL);
    }, [navigation]);

    return (
      <PressableView style={[styles.button, style]} onPress={handleBannerPress}>
        <TextView style={styles.buttonText} type='bold'>
          {children}
        </TextView>
        <Icons.Unlock style={styles.unlockIcon} />
      </PressableView>
    );
  },
);
