import React from 'react';
import { Text, View } from 'react-native';
import CommonStatusBar from '@cmp/CommonStatusBar';

function Home() {
  return (
    <View>
      <CommonStatusBar />
      <Text>홈 화면</Text>
    </View>
  );
}

export default Home;
