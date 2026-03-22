import { useCallback, useEffect, useState } from 'react';

import { CoreRepository } from '@/api/core/core';
import { ConfigResponse } from '@/api/core/core.types';
import { SecuredStorage, SecuredStorageKey } from '@/services/securedStorage/securedStorage';

async function persistConfig(config: ConfigResponse): Promise<void> {
  await Promise.all([
    SecuredStorage.setItem(SecuredStorageKey.awsAccessToken, config.awsAccessToken),
    SecuredStorage.setItem(SecuredStorageKey.awsAccountId, config.awsAccountId),
    SecuredStorage.setItem(SecuredStorageKey.awsConnectionString, config.awsConnectionString),
    SecuredStorage.setItem(SecuredStorageKey.awsSecretKey, config.awsSecretKey),
  ]);
}

export function useCredentialsConfig() {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  const fetchAndPersistConfig = useCallback(async () => {
    try {
      const config = await CoreRepository.getConfig();

      await persistConfig(config);
    } catch (error) {
      console.error('useCredentialsConfig: Failed to fetch or persist config', error);
    } finally {
      setIsConfigLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchAndPersistConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isConfigLoaded };
}
