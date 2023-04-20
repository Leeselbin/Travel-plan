import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { has, isEmpty } from 'lodash-es';
import { getData, setData } from './storage';
import { handleErrorResponse } from '@lib/util';
import CustomError from '@lib/CustomError';
import { getApiToken, refreshApiToken, setApiToken } from './keychain';
import { API_TOKEN_EXPIRATION_TIME_THRESHOLD } from './constants';

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
axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const apiToken = await getApiToken();
  const expirationTime = apiToken ? parseInt(apiToken) : undefined;

  // API 인증용 토큰이 존재하면서 만료시간이 지나지 않은 경우
  if (apiToken && expirationTime && expirationTime > new Date().getTime() && expirationTime - new Date().getTime() > API_TOKEN_EXPIRATION_TIME_THRESHOLD) {
    config.headers['Authorization'] = `Bearer ${apiToken}`;
  }
  // API 인증용 토큰이 존재하면서 만료시간이 지난 경우
  else if (apiToken && (!expirationTime || expirationTime < new Date().getTime())) {
    console.log('API token is expired.');
    const newToken = await refreshApiToken();
    if (newToken) {
      await setApiToken(newToken);
      config.headers['Authorization'] = `Bearer ${newToken}`;
    }
  }
  // API 인증용 토큰이 존재하지 않는 경우
  else {
    console.log('API token not found.');
    const newToken = await refreshApiToken();
    if (newToken) {
      await setApiToken(newToken);
      config.headers['Authorization'] = `Bearer ${newToken}`;
    }
  }

  return config;
});

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
