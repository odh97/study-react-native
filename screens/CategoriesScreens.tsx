import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {CATEGORIES} from '../data/dummy-data.js';

export default function CategoriesScreens({navigation}: {navigation: any}) {
  function handleNavigation(title: string, color: string) {
    console.log('pressed');
    navigation.navigate('screensDetail', {title: title, color: color});
  }

  return (
    <>
      <View style={{alignItems: 'center'}}>
        <FlatList
          style={styles.listStyle}
          data={CATEGORIES}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item: {title, color}}) => {
            return (
              <CategoryGridTile
                title={title}
                color={color}
                handleNavigation={() => handleNavigation(title, color)}
              />
            );
          }}
        />
      </View>
    </>
  );
}

function CategoryGridTile({
  title,
  color,
  handleNavigation,
}: {
  title: string;
  color: string;
  handleNavigation: any;
}) {
  return (
    <View style={[styles.listItem, {backgroundColor: color}]}>
      <Pressable onPress={handleNavigation}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              verticalAlign: 'middle',
              lineHeight: 150,
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  listStyle: {
    width: '96%',
    backgroundColor: 'lightblue',
  },
  listItem: {
    margin: 10,
    width: '45%',
    textAlign: 'center',
    height: 150,
    borderRadius: 10,
  },
});
