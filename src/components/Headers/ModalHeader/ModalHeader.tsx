import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';
import { ScreenHeader, ScreenHeaderProps } from '../ScreenHeader/ScreenHeader';

export interface ModalHeaderProps extends ScreenHeaderProps {
  disableClose?: boolean;
  hideClose?: boolean;
  onClosePress?: () => void;
}

export const ModalHeader = ({
  disableClose,
  hideClose = false,
  onClosePress,
  ...props
}: ModalHeaderProps) => {
  const navigation = useAppNavigation();

  const handleClosePress = () => {
    if (onClosePress) {
      onClosePress();
    }
    navigation.goBack();
  };

  const renderRight = (
    <PressableView
      disabled={disableClose}
      hitSlop={EXTRA_TOUCH_AREA}
      testID='closeBtn'
      onPress={handleClosePress}
    >
      {/* <Icons.Close /> */}
    </PressableView>
  );

  return <ScreenHeader renderLeft={null} renderRight={hideClose ? null : renderRight} {...props} />;
};
