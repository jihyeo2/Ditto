import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import CategoryWithImageItem from "../components/CategoryWithImageItem";
import routes from "../navigation/routes";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";

function ShoppingScreen({ navigation }) {
  const getListingsApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request();
    }
    fetchData();
  }, []);

  return (
    <FlatList
      data={getListingsApi.data}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.list}
      renderItem={({ item }) => (
        <CategoryWithImageItem
          item={item}
          onPress={() => navigation.navigate(routes.CATEGORY_SHOPPING, item)}
        />
      )}
    />
  );
}

//want to make the list scrollable? already it is

const styles = StyleSheet.create({
  list: {
    justifyContent: "space-evenly",
  },
});

export default ShoppingScreen;
