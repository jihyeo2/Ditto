import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import routes from "../navigation/routes";
import categoriesApi from "../api/categories";

function ShoppingScreen({ navigation }) {
  const getListingsApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request();
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(item) => item._id.toString()}
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
