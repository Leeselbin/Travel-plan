import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {getData} from './storage';
import {handleErrorResponse} from './util';

interface IReponseData {
  data?: any;
  errorCode?: string;
}

export const apiClient = axios.create({
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
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // HTTP 응답이 200이 아닌 경우
    if (error.response) {
      const {status, data}: {status: number; data: IReponseData} =
        error.response;
      if (status >= 400 && status < 500) {
        // 400 ~ 499 에러 처리
        handleErrorResponse(status, data.errorCode);
      } else if (status >= 500) {
        // 500 에러 처리
        handleErrorResponse(status, null);
      } else if (data && data.errorCode) {
        // 서버에서 발생한 에러 처리
        throw new Error(data.errorCode);
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
