import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import _ from 'lodash';
import {getData} from './storage';
import {handleErrorResponse} from './util';

interface IReponseData {
  data?: any;
  errorCode?: string;
}

const instance = axios.create({
  baseURL: '',
});

// 요청 인터셉터 설정
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getData('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    // 요청 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // HTTP 응답이 200이 아닌 경우
    if (error.response && _.isEmpty(error.response)) {
      const status = error.response?.status;
      const data = error.response?.data as IReponseData;

      let errorCode = '500';

      if (data && _.has(data, 'errorCode') && data.errorCode) {
        errorCode = data.errorCode;
      }

      if (status >= 400 && status < 500) {
        // 400 ~ 499 에러 처리
        handleErrorResponse(status, errorCode);
      } else if (status >= 500) {
        // 500 에러 처리
        handleErrorResponse(status, '500');
      } else if (data && errorCode) {
        // 서버에서 발생한 에러 처리
        throw new Error(errorCode);
      }
    } else if (error.request) {
      // 요청이 전송되지 않은 경우
      console.error(error.request);
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
