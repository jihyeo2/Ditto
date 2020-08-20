import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import StorePickerItem from "../components/StorePickerItem";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import storesApi from "../api/stores";
import AppText from "../components/AppText";
import colors from "../config/colors";

function SearchResultsScreen({ route, navigation }) {
  async function fetchData() {
    const response = await getListingsApi.request(searchItem.searchItem);
    searchItem = null;
  }
  let searchItem = route.params;
  console.log("searchitem received", searchItem);

  const getListingsApi = useApi(storesApi.getStoresByKeyword);

  useEffect(() => {
    console.log("yes you did it");
    fetchData();
  }, [searchItem.searchItem]);

  return (
    <Screen>
      <View style={styles.container}>
        <AppText
          style={{
            margin: 5,
            marginLeft: 10,
            alignSelf: "center",
            color: colors.secondary,
          }}
        >
          You searched "{searchItem.searchItem}"
        </AppText>
        {getListingsApi.data[0] ? (
          <FlatList
            data={getListingsApi.data}
            keyExtractor={(item) => item._id.toString()}
            numColumns={1}
            width="100%"
            renderItem={({ item }) => (
              <StorePickerItem
                item={item}
                onPress={() =>
                  navigation.navigate(routes.STORE_MAIN, {
                    ...item,
                    editButton: false,
                  })
                }
              />
            )}
          />
        ) : (
          <AppText style={{ color: colors.medium }}>No result.</AppText>
        )}
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
