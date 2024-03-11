import React from 'react';
import {Text, View} from 'react-native';

export default function CategoriesScreensDetail({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {title, color} = route.params;
  navigation.setOptions({
    title: title, // title 바꾸기
    headerRight: () => {
      return <Text>Detail</Text>;
    },
  });

  console.log(title, color);
  console.log(navigation);

  return (
    <>
      <View style={{backgroundColor: color}}>
        <Text>{title}</Text>
      </View>
    </>
  );
}
