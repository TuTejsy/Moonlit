import { StackNavigationOptions } from '@react-navigation/stack';

import { IS_ANDROID } from '@/constants/common';
import { ITheme } from '@/hooks/theme/useTheme';

// import { ModalHeader } from '@/components/Headers/ModalHeader/ModalHeader';
// import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';

export const rootOptions = ({ colors }: ITheme): StackNavigationOptions => ({
  cardStyle: {
    backgroundColor: colors.white,
  },
  headerShadowVisible: false,
  headerShown: true,
  presentation: IS_ANDROID ? 'transparentModal' : 'card',
});

export const tabOptions: StackNavigationOptions = {
  headerShown: false,
  presentation: 'transparentModal',
};