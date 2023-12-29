import { useEffect } from 'react';

import { useIAP } from 'react-native-iap';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { unlockFullVersion } from '@/store/user/user.slice';

export const useCheckSubscription = () => {
  // const {
  //   currentPurchase,
  //   currentPurchaseError,
  //   finishTransaction,
  //   getPurchaseHistory,
  //   purchaseHistory,
  // } = useIAP();
  // const dispatch = useAppDispatch();
  // console.log('purchaseHistory: ', purchaseHistory);
  // useEffect(() => {
  //   getPurchaseHistory();
  // }, []);
  // useEffect(() => {
  //   console.log('currentPurchase: ', currentPurchase);
  //   if (currentPurchase?.transactionReceipt) {
  //     dispatch(unlockFullVersion);
  //     finishTransaction({ isConsumable: true, purchase: currentPurchase });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPurchase, currentPurchaseError]);
};
