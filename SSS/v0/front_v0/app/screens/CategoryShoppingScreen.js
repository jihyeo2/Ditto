import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import StorePickerItem from "../components/StorePickerItem";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import storesApi from "../api/storesInCategory";

function CategoryShoppingScreen({ route, navigation }) {
  const { _id } = route.params; //category_id

  const getListingsApi = useApi(storesApi.getStores);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request(_id);
      console.log("list of stores in category", getListingsApi.data.stores);
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={getListingsApi.data.stores}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
          width="100%"
          renderItem={({ item }) => (
            <StorePickerItem
              item={item}
              onPress={() => navigation.navigate(routes.STORE_MAIN, item)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});

export default CategoryShoppingScreen;
