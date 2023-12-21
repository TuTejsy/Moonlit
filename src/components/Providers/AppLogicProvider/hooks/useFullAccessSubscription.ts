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
    getProducts,
    getPurchaseHistories,
    getSubscriptions,
    initConnectionError,
    products,
    promotedProductsIOS,
    purchaseHistories,
    subscriptions,
  } = useIAP();

  useEffect(() => {
    getProducts({ skus: ['moonlit_full_access'] });
    getSubscriptions({ skus: ['moonlit_full_access'] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('connected: ', connected);
  console.log('products: ', products);
  console.log('subscriptions: ', subscriptions);
  console.log('availablePurchases: ', availablePurchases);
  console.log('promotedProductsIOS: ', promotedProductsIOS);
  console.log('initConnectionError: ', initConnectionError);
};
