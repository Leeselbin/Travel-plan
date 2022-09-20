// import { _History } from '@lib/router/history';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import qs from 'qs';

// import { errorMsg } from '@lib/api/apiUtils';
// import CustomError from './CustomError';

interface CustomResponseFormat<T = any> {
  response: T;
  refreshedToken?: string;
}

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
  };
  getUri: (config?: AxiosRequestConfig) => string;
  request: <T>(config: AxiosRequestConfig) => Promise<T>;
  get: <T>(url: string, param?: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  head: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  options: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
}

const axiosHeaders = {
  'Content-type': 'application/json',
};
const _axios: CustomInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 3 * 1000,
  headers: axiosHeaders,
});

_axios.interceptors.request.use(
  request => {
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  res => {
    return res.data;
  },
  async (error: AxiosError) => {
    const {config} = error;
    const originalRequest = config;

    const url: string | undefined = originalRequest.url;

    console.log(' >> url : ', url);

    if (error.status === '504') {
      return Promise.reject(
        'error',
        // new CustomError(error.message, url, response?.status),
      );
    } else if (error.code === 'ERR_NETWORK') {
      //   return Promise.reject(new CustomError(error.message, url, response?.status));
      //   _History.replace('/error');
    }

    // errorMsg(error);

    return Promise.reject(
      'error',
      //   new CustomError(error.message, url, response?.status),
    );
  },
);

_axios.defaults.validateStatus = (status: number) => {
  return status >= 200 && status < 300; // default
};
_axios.defaults.paramsSerializer = (params: any) => {
  return qs.stringify(params);
};

export const get = (url: string, param?: any, config?: AxiosRequestConfig) => {
  return _axios.get(url, param, config);
};

export const post = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return _axios.post(url, data, config);
};

export const put = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return _axios.put(url, data, config);
};

export const patch = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return _axios.patch(url, data, config);
};

export const _delete = (url: string, config?: AxiosRequestConfig) => {
  return _axios.delete(url, config);
};

export default _axios;
