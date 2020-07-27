import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import CategoryPickerItem from "../components/CategoryPickerItem";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

const categories = [
  {
    id: 1,
    label: "vegetables",
    icon: "flower",
  },
  {
    id: 2,
    label: "Meat",
    icon: "home",
  },
  {
    id: 3,
    label: "Snack",
    icon: "home",
  },
  {
    id: 4,
    label: "Fruits",
    icon: "home",
  },
  {
    id: 5,
    label: "Fish",
    icon: "home",
  },
  {
    id: 6,
    label: "Others",
    icon: "home",
  },
];

function ShoppingScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppTextInput
          icon="home"
          placeholder="Search items"
          textInputStyle={{ flex: 1 }}
          clickButton
          onPress={() => navigation.navigate(routes.SEARCH_RESULTS)}
        />
      </View>
      <ListItemSeparator />
      <View style={styles.list}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          width="100%"
          renderItem={({ item }) => (
            <CategoryPickerItem
              item={item}
              onPress={() => {
                console.log(item);
              }}
            />
          )}
        />
      </View>
    </Screen>
  );
}

//want to make the list scrollable? already it is

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.white,
  },
  container: {
    padding: 20,
    width: "100%",
    height: 100,
    paddingBottom: 15,
  },
  list: {
    paddingTop: 15,
  },
});

export default ShoppingScreen;
