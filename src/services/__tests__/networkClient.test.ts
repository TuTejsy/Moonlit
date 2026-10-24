import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { NetworkClient } from '../networkClient/networkClient';
import { isValidRequestId, REQUEST_ID_HEADER } from '../networkClient/requestId';

// auth.ts is gitignored. A virtual mock keeps this test runnable without that secrets file.
jest.mock(
  '@/constants/auth',
  () => ({
    JWT_TOKEN: 'mock-jwt-token',
  }),
  { virtual: true },
);

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

  describe('X-Request-ID', () => {
    const responseBody = { data: [{ id: 1 }], meta: { ok: true } };

    function readHeader(headers: unknown, name: string): unknown {
      if (headers instanceof AxiosHeaders) {
        return headers.get(name);
      }

      return undefined;
    }

    function createClient(
      onRequest: (config: InternalAxiosRequestConfig) => void,
      response: { data: unknown; requestId: string; status: number } = {
        data: responseBody,
        requestId: 'server-request-id',
        status: 200,
      },
    ): NetworkClient {
      return new NetworkClient({
        adapter: (config) => {
          onRequest(config);
          const axiosResponse: AxiosResponse = {
            config,
            data: response.data,
            headers: { 'X-Request-ID': response.requestId },
            status: response.status,
            statusText: response.status === 200 ? 'OK' : 'Error',
          };

          if (response.status >= 400) {
            return Promise.reject(
              new AxiosError(
                'Request failed',
                AxiosError.ERR_BAD_RESPONSE,
                config,
                undefined,
                axiosResponse,
              ),
            );
          }

          return Promise.resolve(axiosResponse);
        },
        baseURL: 'https://api.example.com',
      });
    }

    it('sets a fresh safe X-Request-ID on each request', async () => {
      const seen: string[] = [];
      const client = createClient((config) => {
        const requestId = readHeader(config.headers, REQUEST_ID_HEADER);
        if (typeof requestId === 'string') {
          seen.push(requestId);
        }
      });

      const first = await client.instance.get('/stories', { params: { storyId: 7 } });
      const second = await client.instance.post('/playNotify', null);

      expect(seen).toHaveLength(2);
      expect(isValidRequestId(seen[0])).toBe(true);
      expect(isValidRequestId(seen[1])).toBe(true);
      expect(seen[0]).not.toBe(seen[1]);
      expect(seen[0]).not.toContain('storyId');
      expect(first.data).toEqual(responseBody);
      expect(second.data).toEqual(responseBody);
    });

    it('keeps a valid caller-supplied X-Request-ID', async () => {
      let outboundId: unknown;
      const client = createClient((config) => {
        outboundId = readHeader(config.headers, REQUEST_ID_HEADER);
      });

      const response = await client.instance.get('/stories', {
        headers: { 'X-Request-ID': 'Ab.C_d-1' },
      });

      expect(outboundId).toBe('Ab.C_d-1');
      expect(readHeader(response.headers, REQUEST_ID_HEADER)).toBe('server-request-id');
      expect(readHeader(response.config.headers, REQUEST_ID_HEADER)).toBe('Ab.C_d-1');
      expect(response.data).toEqual(responseBody);
    });

    it('keeps a valid id supplied with a lowercase header name', async () => {
      let outboundId: unknown;
      const client = createClient((config) => {
        outboundId = readHeader(config.headers, REQUEST_ID_HEADER);
      });

      await client.instance.post('/playNotify', null, {
        headers: { 'x-request-id': 'explicit-post-id' },
      });

      expect(outboundId).toBe('explicit-post-id');
    });

    it('replaces an invalid X-Request-ID and leaves Authorization unchanged', async () => {
      const invalidIds = ['bad id', 'a'.repeat(65), 'bad/id', 'token=secret', 'café'];

      await Promise.all(
        invalidIds.map(async (invalidId) => {
          let outboundId: unknown;
          let authorization: unknown;
          const client = createClient((config) => {
            outboundId = readHeader(config.headers, REQUEST_ID_HEADER);
            authorization = readHeader(config.headers, 'Authorization');
          });

          const response = await client.instance.get('/stories', {
            headers: { 'X-Request-ID': invalidId },
          });

          expect(isValidRequestId(outboundId)).toBe(true);
          expect(outboundId).not.toBe(invalidId);
          expect(String(outboundId)).not.toContain('secret');
          expect(authorization).toBe('mock-jwt-token');
          expect(response.data).toEqual(responseBody);
          expect(readHeader(response.headers, REQUEST_ID_HEADER)).toBe('server-request-id');
        }),
      );

      expect(axios.defaults.headers.common.Authorization).toBe('mock-jwt-token');
      expect(axios.defaults.headers.common['X-Request-ID']).toBeUndefined();
      expect(axios.defaults.withCredentials).toBe(false);
    });

    it('keeps the server id on an Axios error without changing the error body', async () => {
      const errorBody = { status: 'unavailable' };
      let outboundId: unknown;
      let authorization: unknown;
      const client = createClient(
        (config) => {
          outboundId = readHeader(config.headers, REQUEST_ID_HEADER);
          authorization = readHeader(config.headers, 'Authorization');
        },
        { data: errorBody, requestId: 'server-error-id', status: 503 },
      );

      try {
        await client.instance.get('/readyz');
        throw new Error('expected the request to fail');
      } catch (error) {
        expect(axios.isAxiosError(error)).toBe(true);
        if (!axios.isAxiosError(error)) {
          return;
        }

        expect(error.response?.status).toBe(503);
        expect(error.response?.data).toEqual(errorBody);
        expect(readHeader(error.response?.headers, REQUEST_ID_HEADER)).toBe('server-error-id');
        expect(readHeader(error.config?.headers, REQUEST_ID_HEADER)).toBe(outboundId);
        expect(isValidRequestId(outboundId)).toBe(true);
        expect(outboundId).not.toBe('server-error-id');
        expect(authorization).toBe('mock-jwt-token');
      }
    });
  });
});
