import { SERVER_URL } from '@/constants/common';
import { NetworkClient } from '@/services/networkClient/networkClient';

import { ConfigResponse } from './core.types';

const networkClient = new NetworkClient({
  baseURL: SERVER_URL,
});

export const CoreRepository = {
  getConfig: async () => {
    const response = await networkClient.instance.get<ConfigResponse>('config');

    return response.data;
  },
};
