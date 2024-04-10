import { useEffect } from 'react';

import { adapty } from 'react-native-adapty';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useMutableValue } from '@/hooks/useMutableValue';
import { lockFullVersion, unlockFullVersion } from '@/store/user/user.slice';

export const useCheckSubscription = (skipCheck = false) => {
  const dispatch = useAppDispatch();
  const { showPaywallModal } = useShowPaywallModal();
  const showPaywallModalRef = useMutableValue(showPaywallModal);

  useEffect(() => {
    if (skipCheck) {
      return;
    }

    adapty.getProfile().then((profile) => {
      const isActive = profile?.accessLevels?.premium?.isActive;

      if (isActive) {
        dispatch(unlockFullVersion());
      } else {
        dispatch(lockFullVersion());
        showPaywallModalRef.current();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
