import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import StorePickerItem from "../components/StorePickerItem";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AppTextInput from "../components/AppTextInput";

import vegetablesListings from "../store/vegetablesListings";

function CategoryShoppingScreen({ route, navigation }) {
  const { id } = route.params;
  let listings = null;
  switch (id) {
    case 1:
      console.log(vegetablesListings);
      listings = vegetablesListings;
      console.log(listings);
      break;
    case 2:
      listings = vegetablesListings;
      break;
    case 3:
      listings = vegetablesListings;
      break;
    default:
      break;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          width="100%"
          renderItem={({ item }) => (
            <StorePickerItem
              item={item}
              onPress={() => navigation.navigate(routes.SEARCH_RESULTS)}
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
