import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
export default function PlatFormCp() {
  return (
    <View style={styles.platFormCpStyle}>
      <Text>현재 기기 : {Platform.OS}</Text>
      <Text>Platform 구분 방법 ios : yellow</Text>
      <Text>Platform 구분 방법 android: lightblue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  platFormCpStyle: {
    // backgroundColor: Platform.OS === 'ios' ? 'yellow' : 'lightblue', // Platform.OS는 ios, android를 구분해준다.
    backgroundColor: Platform.select({ios: 'yellow', android: 'lightblue'}), // Platform.select은 ios, android를 구분해준다.
  },
});
