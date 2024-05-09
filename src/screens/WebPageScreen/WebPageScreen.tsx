import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { WebView, WebViewNavigation } from 'react-native-webview';

import { AbsoluteSpinnerView } from '@/components/AbsoluteSpinnerView/AbsoluteSpinnerView';
import { MOONLIT_SITE_URL } from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { makeStyles } from './WebPageScreen.styles';

export const WebPageScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const {
    params: { url },
  } = useAppRoute<RootRoutes.WEB_PAGE_SCREEN>();

  const navigation = useAppNavigation<RootRoutes.WEB_PAGE_SCREEN>();

  const [isPageLoading, setIsPageLoading] = useState(true);

  const handleNavigationStateChange = useCallback(
    (event: WebViewNavigation) => {
      const { url } = event;

      console.log('url: ', event);

      if (url === MOONLIT_SITE_URL) {
        navigation.goBack();
      }
    },
    [navigation],
  );

  const handleLoad = useCallback(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <View style={styles.screen}>
      <WebView
        source={{ uri: url }}
        style={styles.webView}
        onError={navigation.goBack}
        onLoad={handleLoad}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <AbsoluteSpinnerView color={colors.white} delay={0} enableBlur={false} show={isPageLoading} />
    </View>
  );
};
