/* eslint-disable dot-notation */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { sign } from 'react-native-pure-jwt';

import { JWT_PAYLOAD, JWT_SECRET } from '@/constants/auth';

let jwt: string | undefined;

sign({ sub: JWT_PAYLOAD }, JWT_SECRET, { alg: 'HS256' }).then((token) => {
  jwt = token;
});

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['pragma'] = 'no-cache';
axios.defaults.withCredentials = false;

export class NetworkClient {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig<any> | undefined) {
    this.instance = axios.create({
      ...config,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma', encode: false }),
    });

    this.instance.interceptors.request.use((request) => {
      request.headers.Authorization = jwt;
      return request;
    });
  }
}
