import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { saveCredentials, getCredentials } from './keychain';

// JWT 토큰 관련 상수
const JWT_TOKEN_KEY = 'jwtToken';
const JWT_EXPIRATION_TIME_KEY = 'jwtTokenExpirationTime';
const JWT_EXPIRATION_TIME_THRESHOLD = 60; // 60초 이하로 만료되면 재발급

// JWT 토큰 갱신 API 호출 함수
const refreshJwtToken = async (): Promise<string | null> => {
  // TODO: JWT 토큰 갱신 API 호출하여 새로운 토큰 받아오기
  const newToken = 'newJwtToken';

  // 새로운 토큰 저장
  if (newToken) {
    const expirationTime = new Date().getTime() + 600000; // 600초(10분) 만료 시간 설정
    await saveCredentials(JWT_TOKEN_KEY, newToken);
    await saveCredentials(JWT_EXPIRATION_TIME_KEY, expirationTime.toString());
    console.log('New JWT token saved successfully!');
    return newToken;
  }

  console.log('Error refreshing JWT token.');
  return null;
};

// 요청 인터셉터 설정
axios.interceptors.request.use(async (config: any) => {
  const credentials = await getCredentials();
  const jwtToken = credentials?.password;
  const expirationTime = credentials ? parseInt(credentials.accessibilityLabel) : undefined;

  // JWT 토큰이 존재하면서 만료시간이 지나지 않은 경우
  if (jwtToken && expirationTime && expirationTime > new Date().getTime() && expirationTime - new Date().getTime() > JWT_EXPIRATION_TIME_THRESHOLD * 1000) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`;
  }
  // JWT 토큰이 존재하면서 만료시간이 지난 경우
  else if (jwtToken && (!expirationTime || expirationTime < new Date().getTime())) {
    console.log('JWT token is expired.');
    const newToken = await refreshJwtToken();
    if (newToken) {
      config.headers['Authorization'] = `Bearer ${newToken}`;
    }
  }
  // JWT 토큰이 존재하지 않는 경우
  else {
    console.log('JWT token not found.');
  }

  return config;
});
