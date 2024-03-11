import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export default function DimensionsCp() {
  const {width, height} = useWindowDimensions();

  return (
    <View>
      <View style={styles.dimensionsCp}>
        <Text>상태에 맞는 동적 css</Text>
      </View>
      <View
        style={[
          styles.useDimensionsCp,
          {backgroundColor: width > 360 ? 'green' : 'blue'},
        ]}>
        <Text style={styles.textStyle}>상태에 맞는 동적 css</Text>
      </View>
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  dimensionsCp: {
    backgroundColor: deviceWidth > 360 ? 'yellow' : 'lightblue',
  },
  useDimensionsCp: {},
  textStyle: {
    color: 'white',
  },
});
