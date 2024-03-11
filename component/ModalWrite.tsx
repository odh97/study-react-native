import {
  Button,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

export default function ModalWrite({
  value,
  isVisible,
  onChangeText,
  onPress,
  handelPressClose,
}: {
  value: string;
  isVisible: boolean;
  onChangeText: (text: string) => void;
  onPress: () => void;
  handelPressClose: () => void;
}) {
  return (
    // ios는 키보드가 보이지 않을때 cmd + k를 누르면 키보드가 보인다.

    <ScrollView>
      <KeyboardAvoidingView behavior={'position'}>
        <Modal
          visible={isVisible}
          animationType={'slide'}
          supportedOrientations={['portrait', 'landscape']}>
          {/*supportedOrientations는 ios를 회전할 수 있게 해준다 */}
          <View style={styles.textAddBox}>
            <Image
              source={require('../assets/Image/goal.png')}
              style={styles.firstImage}
            />
            <TextInput
              style={styles.textInput}
              value={value}
              placeholder={'Type here'}
              onChangeText={onChangeText}
            />
            <View style={{flexDirection: 'row', gap: 30, marginTop: 10}}>
              <Button title={'add Goal'} onPress={onPress} />
              <Button title={'Close'} onPress={handelPressClose} />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textAddBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'lightblue',
  },
  textInput: {
    width: '90%',
    height: 40,
    backgroundColor: 'darkgrey',
    margin: 10,
  },
  firstImage: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    marginBottom: 30,
  },
});
