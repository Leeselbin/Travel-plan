import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ColContainer, Image } from './src/utils/StyledComponent';
import { I_HOME_FOCUS, I_HOME_UNFOCUS } from './src/utils/icons';
import { colors } from './src/utils/colors';
import { StyleSheet, Text } from 'react-native';
import Home from './src/screens/Home';
import Member from './src/screens/Member';
import My from './src/screens/My';
import Shopping from './src/screens/Shopping';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import axios from 'axios';
import { useState } from 'react';
import AuthStore from '@store/AuthStore';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
  Member: undefined;
  My: undefined;
  Shopping: undefined;
  Home: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Member: undefined;
  My: undefined;
  Shopping: undefined;
  Home: undefined;
};

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();



function AppInner() {


  const { isLoggedIn } = AuthStore();

  // TODO: 네비게이터별로 컴포넌트화 해서 삽입
  return !isLoggedIn ? (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: [
          {
            // borderWidth: 1,
            // borderColor: colors.grey_300,
            // borderTopLeftRadius: 16,
            // borderTopRightRadius: 16,
          },
        ],
        tabBarItemStyle: {},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <ColContainer style={{ alignItems: 'center' }}>
                <Image
                  style={{ width: 20, height: 20, marginTop: 5 }}
                  source={focused ? I_HOME_FOCUS : I_HOME_UNFOCUS}
                  resizeMode={'contain'}
                />
                <Text
                  style={
                    focused ? styles.iconFocusText : styles.iconUnFocusText
                  }>
                  {'홈'}
                </Text>
              </ColContainer>
            );
          },
        }}
      />
      <Tab.Screen name="Member" component={Member} options={{ title: '멤버' }} />
      <Tab.Screen name="My" component={My} options={{ title: '내 정보' }} />
      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{ title: '쇼핑' }}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: '로그인',
          animationTypeForReplace: 'push',
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '회원가입',
          animationTypeForReplace: 'push',
          animation: 'slide_from_left',
        }}
      />
    </Stack.Navigator>
  );
}

export default AppInner;

const styles = StyleSheet.create({
  iconFocusText: {
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
    color: colors.Text_1,
  },
  iconUnFocusText: {
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
    color: colors.Text_2,
  },
});
