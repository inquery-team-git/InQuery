/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestTransformer,
  AxiosResponse,
  AxiosResponseTransformer,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import axios from 'axios';
import { get as lodashGet, isEmpty, isObject } from 'lodash';

import {
  getAuthCompanyData,
  getAuthToken,
  getSessionId,
  removeAuthToken,
  setSessionId,
} from './session-manager.util';

interface SendRequest {
  method?: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: any;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
}

const getHostUrl = () => {
  if (typeof window !== 'undefined' && process.env.API_PORT) {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:${process.env.API_PORT}`;
  }
  return process.env.API_BASE_URL;
};

const apiInstance: AxiosInstance = axios.create({
  baseURL: `${getHostUrl()}`,

  headers: {
    'Content-Type': 'application/json',
    platform: 'web',
    version: process.env.APP_VERSION,
  },
});

const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response && error.response.status === 401) removeAuthToken();
  const errorObj = lodashGet(error, 'response.data.errors');
  let resErr = '';
  if (!isEmpty(errorObj) && isObject(errorObj)) {
    resErr = Object.values(errorObj).join('\n');
  }
  return Promise.reject(
    resErr || lodashGet(error, 'response.data.message') || error.message
  );
};

const handleResponse = ({ data, headers }: AxiosResponse): AxiosResponse => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  headers['session-id'] && setSessionId(headers['session-id']);
  return data;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const handleRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAuthToken();
  const authUcrmData = getAuthCompanyData();
  config.headers = config.headers || {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (!isEmpty(authUcrmData)) {
    config.headers['x-api-key'] = authUcrmData.companyHash;
    config.headers.domain = authUcrmData.domain;
  }
  const sessionId = getSessionId();
  if (sessionId) config.headers['session-id'] = sessionId;
  return config;
};

apiInstance.interceptors.request.use(handleRequest, handleRequestError);

apiInstance.interceptors.response.use(handleResponse, handleResponseError);

function sendRequest({
  url,
  params = {},
  headers = {},
  data = {},
  method,
  transformRequest,
  transformResponse,
}: SendRequest) {
  const config: AxiosRequestConfig<SendRequest> = {
    method,
    url,
    params,
    headers,
    data,
  };
  if (transformRequest) config.transformRequest = transformRequest;
  if (transformResponse) config.transformResponse = transformResponse;
  return apiInstance(config);
}

export const get = ({
  url,
  params = {},
  headers = {},
  transformResponse,
}: SendRequest) =>
  sendRequest({
    method: 'GET',
    url,
    params,
    headers,
    transformResponse,
  });

export const post = ({
  url,
  data = {},
  headers = {},
  transformRequest,
}: SendRequest) =>
  sendRequest({
    method: 'POST',
    url,
    data,
    headers,
    transformRequest,
  });

export const put = ({ url, data = {}, headers = {} }: SendRequest) =>
  sendRequest({
    method: 'PUT',
    url,
    data,
    headers,
  });

export const patch = ({ url, data = {}, headers = {} }: SendRequest) =>
  sendRequest({
    method: 'PATCH',
    url,
    data,
    headers,
  });

export const remove = ({ url, data = {}, headers = {} }: SendRequest) =>
  sendRequest({
    method: 'DELETE',
    url,
    data,
    headers,
  });
