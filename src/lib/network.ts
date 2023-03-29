import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { has, isEmpty } from 'lodash-es';
//   import {getData} from './storage';
import { handleErrorResponse } from '@lib/util';
import CustomError from '@lib/CustomError';

const instance = axios.create({
  baseURL: ``,
});

export interface ApiData {
  code: string;
  message: string;
  data: any;
  timestamp: string;
}

// 요청 인터셉터 설정
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //   const token = getData('token');
    const token = 'token here';
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    if (error.request) {
      handleErrorResponse(error.response?.status);
    } else {
      handleErrorResponse(0, 'Request failed');
    }
    return Promise.reject(error.message);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 서비스 에러 발생, 요청한곳으로 전파
    if (response.data && response.data.code !== 'SUCCESS') {
      const rd: ApiData = response.data;
      throw new CustomError(rd.code, response);
    }
    return response;
  },
  (error: AxiosError) => {
    // if (error.response && isEmpty(error.response)) {
    //   const status = error.response?.status;
    //   const data = error.response?.data as ApiData;

    //   let code = 'ESYS000';

    //   // errorCode 검사
    //   if (data && has(data, 'code') && data.code) {
    //     code = data.code;
    //     if (code !== 'ESYS000') {
    //       handleErrorResponse(status, code);
    //     } else {
    //       handleErrorResponse(status, code);
    //     }
    //   }
    // } else 
    if (error.request) {
      // 요청실패
      handleErrorResponse(error.response?.status);
    } else if (!error.request) {
      // 요청실패
      handleErrorResponse(0, 'Request failed');
    } else {
      // 기타 문제
      handleErrorResponse(error.response?.status);
    }

    return Promise.reject(error.message);
  },
);

export default instance;
