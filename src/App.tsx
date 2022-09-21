/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {QueryClient, QueryClientProvider} from 'react-query';
import Main from './pages/Main';
import Temp from './pages/Temp';

const Stack = createNativeStackNavigator();

const BottomTab = createBottomTabNavigator();

const queryClient = new QueryClient();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName='Main'>
      <BottomTab.Screen name='Main' component={Main} options={{ headerShown: false }} />
      <BottomTab.Screen name='Temp' component={Temp} options={{ headerShown: false }} />
    </BottomTab.Navigator>
  )
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        {/* <Stack.Navigator>
          <Stack.Screen name='Main' component={Main} />
        </Stack.Navigator> */}

        {/* <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Test />
            </View>
          </ScrollView>
        </SafeAreaView> */}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
