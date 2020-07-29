import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import routes from "../navigation/routes";
import useApi from '../hooks/useApi';
import categoriesApi from '../api/categories';

function ShoppingScreen({ navigation }) {
  const getListingsApi = await useApi(categoriesApi.getCategories);

  const getListings = async() => {
    const result = await getListingsApi.request();
    console.log(result);
    if (!result.ok) return;
    return result.data
  };
  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={getListings()}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          width="100%"
          renderItem={({ item }) => (
            <CategoryPickerItem
              item={item}
              onPress={() =>
                navigation.navigate(routes.CATEGORY_SHOPPING, item)
              }
            />
          )}
        />
      </View>
    </Screen>
  );
}

//want to make the list scrollable? already it is

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

export default ShoppingScreen;
