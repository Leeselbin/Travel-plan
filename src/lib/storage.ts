import AsyncStorage from '@react-native-async-storage/async-storage';

//native용 웹뷰용은 localstorage 또는 zustand사용 해야함

// 데이터 저장하기
export const saveData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('데이터 저장 오류:', error);
  }
};

// 데이터 검색하기
export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('데이터 검색 오류:', error);
    return null;
  }
};

export default AsyncStorage;
