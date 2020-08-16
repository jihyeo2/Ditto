import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import StorePickerItem from "../components/StorePickerItem";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import storesApi from "../api/stores";

function SearchResultsScreen({ route, navigation }) {
  const searchItem = route.params;
  console.log(searchItem);

  const getListingsApi = useApi(storesApi.getStoresByKeyword);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request(searchItem);
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
          width="100%"
          renderItem={({ item }) => (
            <StorePickerItem
              item={item}
              onPress={() => navigation.navigate(routes.STORE_MAIN)}
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

export default SearchResultsScreen;
