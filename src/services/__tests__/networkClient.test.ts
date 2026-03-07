import axios from 'axios';

import { NetworkClient } from '../networkClient/networkClient';

jest.mock('@/constants/auth', () => ({
  JWT_TOKEN: 'mock-jwt-token',
}));

describe('NetworkClient', () => {
  it('creates an axios instance with the provided config', () => {
    const config = { baseURL: 'https://api.example.com', timeout: 5000 };

    const client = new NetworkClient(config);

    expect(client.instance).toBeDefined();
    expect(client.instance.defaults.baseURL).toBe('https://api.example.com');
    expect(client.instance.defaults.timeout).toBe(5000);
  });

  it('creates an axios instance with undefined config', () => {
    const client = new NetworkClient(undefined);

    expect(client.instance).toBeDefined();
  });

  it('sets default headers on axios defaults', () => {
    expect(axios.defaults.headers.common['Content-Type']).toBe('application/json');
    expect(axios.defaults.headers.common.Accept).toBe('application/json');
    expect(axios.defaults.headers.common['Cache-Control']).toBe('no-cache');
    expect(axios.defaults.headers.common.pragma).toBe('no-cache');
    expect(axios.defaults.headers.common.Authorization).toBe('mock-jwt-token');
  });

  it('disables withCredentials by default', () => {
    expect(axios.defaults.withCredentials).toBe(false);
  });

  it('uses a custom paramsSerializer based on qs', () => {
    const client = new NetworkClient({ baseURL: 'https://api.example.com' });

    // Access the paramsSerializer from the instance defaults
    const serializer = client.instance.defaults.paramsSerializer;

    if (typeof serializer === 'function') {
      const result = serializer({ ids: [1, 2, 3] });
      expect(result).toBe('ids=1,2,3');
    } else if (serializer && typeof serializer === 'object' && 'serialize' in serializer) {
      const result = (
        serializer as { serialize: (params: Record<string, unknown>) => string }
      ).serialize({ ids: [1, 2, 3] });
      expect(result).toBe('ids=1,2,3');
    }
  });
});
