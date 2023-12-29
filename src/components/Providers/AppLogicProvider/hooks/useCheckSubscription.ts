import { useEffect } from 'react';

import { useIAP } from 'react-native-iap';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { unlockFullVersion } from '@/store/user/user.slice';

export const useCheckSubscription = () => {
  const { currentPurchase, currentPurchaseError, finishTransaction } = useIAP();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentPurchase?.transactionReceipt) {
      dispatch(unlockFullVersion);

      finishTransaction({ isConsumable: true, purchase: currentPurchase });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPurchase, currentPurchaseError]);
};
