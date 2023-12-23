import { useEffect } from 'react';

import { requestPurchase, useIAP } from 'react-native-iap';

export const useFullAccessSubscription = () => {
  const {
    availablePurchases,
    connected,
    currentPurchase,
    currentPurchaseError,
    finishTransaction,
    getAvailablePurchases,
    purchaseHistories,
  } = useIAP();
};
