import React from 'react';
import {
  Button,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ModalWrite from './component/ModalWrite.tsx';
import DimensionsCp from './component/DimensionsCp.tsx';
import PlatFormCp from './component/PlatFormCp.tsx';
import CategoriesScreens from './screens/CategoriesScreens.tsx';
import CategoriesScreensDetail from './screens/CategoriesScreensDetail.tsx';

// [3 ㅇ / 5 ㅇ  / 6 / - / 12 / 13 / 14 / 15]\

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(): React.JSX.Element {
  // 개발자 도구
  // ios = cmd + D
  // android = cmd + M
  return (
    <>
      {/* StatusBar는 떨어져있는 상단의 역할을 한다고 생각하면 된다 */}
      {/* StatusBar는 fragment 안에서 사용해주면 정상 작동한다. */}
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 0 : 24,
          backgroundColor: 'lightblue',
        }}>
        <StatusBar
          animated={true}
          backgroundColor={'transparent'}
          translucent={true}
        />
      </View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="screens">
          <Stack.Screen name="screens" component={CategoriesScreens} />
          <Stack.Screen
            name="screensDetail"
            component={CategoriesScreensDetail}
            // options는 screen에서 사용할 수 있는 옵션을 제공한다.
            // 컴포넌트 안에서도 options를 사용할 수 있다.

            // options 이용해 title 동적 변경 가능
            // options={({ route, navigation }: { route: RouteProp<any>; navigation: any; }) => {
            //   return {title: route.params.title};
            // }}

            // options 이용해 headerRight 기능 및 문구 추가 가능
            options={{
              headerRight: () => {
                return <Button title={'right'} />;
              },
            }}
          />
          <Stack.Screen name="write" component={TodayWrite} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function TodayWrite() {
  const [modalVisible, setModalVisible] = React.useState(false);
  function handelModalToggle() {
    setModalVisible(!modalVisible);
  }

  const [text, setText] = React.useState('');
  const [textList, setTextList] = React.useState<string[]>([]);
  const [FlatTextList, setFlatTextList] = React.useState<
    {
      key: string;
      value: string;
    }[]
  >([]);
  function handelPressButton() {
    console.log('handelPressButton');
    setTextList([...textList, text]);
    setFlatTextList([
      ...FlatTextList,
      {key: new Date().getTime().toString(), value: text},
    ]);

    setModalVisible(!modalVisible);
  }
  function handelChangeText(text: string) {
    setText(text);
  }
  function handelResetButton() {
    setTextList([]);
    setFlatTextList([]);
  }
  function handelDeleteItem(itemKey: string) {
    const newList = FlatTextList.filter(({key}) => key !== itemKey);
    setFlatTextList(newList);
  }

  return (
    <View>
      <ScrollView>
        <ModalWrite
          value={text}
          isVisible={modalVisible}
          onChangeText={handelChangeText}
          onPress={handelPressButton}
          handelPressClose={handelModalToggle}
        />
        <View>
          <Button title={'today list write'} onPress={handelModalToggle} />
        </View>
        <View style={styles.scrollBox}>
          <ScrollView alwaysBounceVertical={true}>
            {textList.map((item, index) => {
              return (
                <View key={index} style={styles.ScrollViewItem}>
                  <Text style={styles.ItemText}>{item}</Text>
                </View>
              );
            })}
          </ScrollView>
          {!!FlatTextList.length && (
            // FlatList 는 ScrollView 와 다르게 key가 데이터에 포함되어 있디면 key를 자동으로 생성해준다.
            // keyExtractor 옵션을 사용하면 key 를 지정할 수 있다.
            // map과 다르게 renderItem 을 사용한다.
            // 왜 FlatList를 사용하나?
            // - FlatList는 데이터가 많아지면 성능이 좋다 이유는 화면에 보이는 데이터만 렌더링하기 때문이다.
            // - 보이지 않는 데이터는 스크롤 할때마다 렌더링 된다. (성능 향상)
            <FlatList
              data={FlatTextList}
              // keyExtractor 옵션을 사용하면 key 를 지정할 수 있다.
              renderItem={({item: {value, key}}) => {
                return (
                  <Pressable
                    android_ripple={{color: 'blue'}}
                    onPress={() => handelDeleteItem(key)}>
                    <View style={styles.FlatListItem}>
                      <Text style={styles.ItemText}>{value}</Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          )}
        </View>
        <DimensionsCp />
        <PlatFormCp />
        <Button title={'reset'} onPress={handelResetButton} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollBox: {
    height: 560,
  },
  ScrollViewItem: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'skyblue',
    color: 'white',
  },
  FlatListItem: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'lightgreen',
    color: 'white',
  },
  ItemText: {
    color: 'white',
    fontSize: 40,
  },
});
