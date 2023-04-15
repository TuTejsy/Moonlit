/* eslint-disable dot-notation */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

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
  }
}
