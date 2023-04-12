import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ColContainer } from '../utils/StyledComponent';
import { statusBarHeight } from '../utils/measurements';
import { colors } from '../utils/colors';

function Member() {
  return (
    <View>
      <ColContainer style={styles.statusBar} />
      <Text>멤버 화면</Text>
    </View>
  );
}

export default Member;

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? statusBarHeight : 0,
    backgroundColor: colors.primary,
  },
});