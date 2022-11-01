/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import Home from './src/pages/Home';
import Member from './src/pages/Member';
import My from './src/pages/My';
import Shopping from './src/pages/Shopping';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const isLoggedIn = false;

function AppInner() {
  return isLoggedIn ? (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{title: '홈'}} />
      <Tab.Screen name="Member" component={Member} options={{title: '멤버'}} />
      <Tab.Screen name="My" component={My} options={{title: '내 정보'}} />
      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{title: '쇼핑'}}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
