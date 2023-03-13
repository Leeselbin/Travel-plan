import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import _ from 'lodash';
//   import {getData} from './storage';
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
    //   const token = getData('token');
    const token = 'token here';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    if (error.request) {
      handleErrorResponse(0, 'Request failed');
    } else {
      handleErrorResponse(0, 'Request failed');
    }
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 서비스 에러 발생, 요청한곳으로 전파
    if (response.data && _.has(response.data, 'errorCode')) {
      const errorCode = response.data.errorCode;
      throw new Error(errorCode);
    }
    return response;
  },
  (error: AxiosError) => {
    // 오류발생
    if (error.response && _.isEmpty(error.response)) {
      const status = error.response?.status;
      const data = error.response?.data as IReponseData;

      let errorCode = '500';

      // errorCode 검사
      if (data && _.has(data, 'errorCode') && data.errorCode) {
        errorCode = data.errorCode;
      }

      handleErrorResponse(status, errorCode);
    } else if (error.request) {
      // 요청실패
      handleErrorResponse(0, 'Request failed');
    } else {
      // 기타 문제
      handleErrorResponse(0, error.message);
    }
  },
);

export default instance;
