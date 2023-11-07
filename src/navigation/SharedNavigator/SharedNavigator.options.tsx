import { StackNavigationOptions } from '@react-navigation/stack';

import { IS_ANDROID } from '@/constants/common';
import { ITheme } from '@/hooks/theme/useTheme';

// import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
// import { SearchHeader } from '@/components/Headers/SearchHeader/SearchHeader';
// import { SearchBar } from '@/components/SearchBar/SearchBar';

export const commonOptions = ({ colors }: ITheme): StackNavigationOptions => ({
  cardStyle: { backgroundColor: colors.white },
  headerShadowVisible: false,
  headerShown: false,
  presentation: IS_ANDROID ? 'transparentModal' : 'card',
});
