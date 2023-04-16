import { useNavigation } from '@react-navigation/native';

import { Icons } from '@/assets/icons/Icons';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';
import { NavigationType } from '../Headers.types';
import { ScreenHeader, ScreenHeaderProps } from '../ScreenHeader/ScreenHeader';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';

export interface ModalHeaderProps extends ScreenHeaderProps {
  disableClose?: boolean;
  hideClose?: boolean;
  onClosePress?: () => void;
  popCountStack?: number;
}

export const ModalHeader = ({
  disableClose,
  hideClose = false,
  onClosePress,
  popCountStack,
  ...props
}: ModalHeaderProps) => {
  const navigation = useNavigation<NavigationType>();

  const handleClosePress = () => {
    if (onClosePress) {
      onClosePress();
    } else if (popCountStack) {
      navigation.pop(popCountStack);
    } else {
      navigation.goBack();
    }
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

  return (
    <ScreenHeader
      renderLeft={popCountStack ? undefined : null}
      renderRight={hideClose ? null : renderRight}
      {...props}
    />
  );
};
