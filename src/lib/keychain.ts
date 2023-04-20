import * as Keychain from 'react-native-keychain';
import { API_TOKEN_KEY } from './constants';
import instance from './network';

const KAKAO_TOKEN_KEY = 'kakaoToken';

// 카카오 로그인 후 발급된 토큰 저장
export const saveKakaoToken = async (token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword(KAKAO_TOKEN_KEY, token);
        console.log('Kakao token saved successfully!');
    } catch (error) {
        console.error('Error saving Kakao token:', error);
    }
};

// 저장된 카카오 토큰 가져오기
export const getKakaoToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === KAKAO_TOKEN_KEY) {
            console.log('Kakao token found:', credentials.password);
            return credentials.password;
        } else {
            console.log('No Kakao token stored.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving Kakao token:', error);
        return null;
    }
};

// 저장된 카카오 토큰 삭제
export const deleteKakaoToken = async (): Promise<void> => {
    try {
        await Keychain.resetGenericPassword();
        console.log('Kakao token deleted successfully!');
    } catch (error) {
        console.error('Error deleting Kakao token:', error);
    }
};

// ---------------------------


// API 토큰 저장
export const setApiToken = async (token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword(API_TOKEN_KEY, token);
        console.log('API token saved successfully!');
    } catch (error) {
        console.error('Error saving API token:', error);
    }
};

// API 토큰 가져오기
export const getApiToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            console.log('API token found:', credentials.password);
            return credentials.password;
        } else {
            console.log('No API token stored.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving API token:', error);
        return null;
    }
};

// API 토큰 삭제
export const deleteApiToken = async (): Promise<void> => {
    try {
        await Keychain.resetGenericPassword();
        console.log('API token deleted successfully!');
    } catch (error) {
        console.error('Error deleting API token:', error);
    }
};


export const refreshApiToken = async (): Promise<any> => {
    try {
        return await instance.post("/auth/refresh/token");
    } catch (error) {
        console.error("Error refresh API token", error);
    }
}
