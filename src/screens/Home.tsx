import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';
import {statusBarHeight} from '../utils/measurements';
import {ColContainer} from '../utils/StyledComponent';

function Home() {
  return (
    <View>
      {/* StatusBar Start */}
      <ColContainer style={styles.statusBar} />
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {/* Statusbar End */}

      <Text>홈 화면</Text>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? statusBarHeight : 0,
    backgroundColor: colors.primary,
  },
});
