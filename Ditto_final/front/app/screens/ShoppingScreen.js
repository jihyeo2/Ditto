import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import CategoryWithImageItem from "../components/CategoryWithImageItem";
import routes from "../navigation/routes";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import CategoryPickerItem from "../components/CategoryPickerItem";

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
      style={{ padding: 10 }}
      columnWrapperStyle={styles.list}
      renderItem={({ item }) => (
        <CategoryPickerItem
          item={item}
          onPress={() =>
            navigation.navigate(routes.CATEGORYSHOPPING_RESULTS, item)
          }
        />
      )}
    />
  );
}

//want to make the list scrollable? already it is

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    justifyContent: "center",
  },
});

export default ShoppingScreen;
