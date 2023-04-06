import {Dimensions, Keyboard, KeyboardEvent, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const statusBarHeight = getStatusBarHeight();

export const basicDimensions = {
  // 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
  height: 812,
  width: 375,
};

export const height = // 높이 변환 작업
  Number.parseFloat(
    (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
  );

export const width = // 가로 변환 작업
  Number.parseFloat(
    (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
  );
export const bottomHegiht = 16;
export const bottomNavHegiht =
  Dimensions.get('screen').height -
  Dimensions.get('window').height -
  StatusBar.currentHeight;
export const iosBottomSpace = 44;
