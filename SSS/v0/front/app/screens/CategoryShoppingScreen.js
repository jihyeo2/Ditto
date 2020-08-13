import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import StorePickerItem from "../components/StorePickerItem";
//import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import storesApi from "../api/storesInCategory";

const categories = [
  {
    id: "1",
    name: "granpa rice cake",
  },
  {
    id: "2",
    name: "jelly beans",
  },
  {
    id: "3",
    name: "butter beer",
  },
];

function CategoryShoppingScreen({ route, navigation }) {
  // let { _id } = route.params; //category_id

  const getListingsApi = useApi(storesApi.getStores);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request(_id);
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          width="100%"
          renderItem={({ item }) => (
            <StorePickerItem
              item={item}
              onPress={() => navigation.navigate(routes.STORE_DETAILS)}
            />
          )}
          // ItemSeparatorComponent={ListItemSeparator}
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
