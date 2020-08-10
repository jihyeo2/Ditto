import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingScreen from "../screens/ShoppingScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import CategoryShoppingScreen from "../screens/CategoryShoppingScreen";
import StoreDetailsScreen from "../screens/StoreDetailsScreen";
import Header from "../components/Header";
import SearchItemContext from "../components/SearchItemContext";

function ShopNavigator() {
  const [searchItem, setSearchItem] = useState();

  const Stack = createStackNavigator();
  return (
    <SearchItemContext.Provider value={{ searchItem, setSearchItem }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
        screenOptions={({ navigation }) => ({
          headerTitle: (props) => <Header navigation={navigation} />,
          headerStatusBarHeight: 30,
          headerLeft: null,
        })}
      >
        <Stack.Screen name="Shoppings" component={ShoppingScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen
          name="CategoryShopping"
          component={CategoryShoppingScreen}
        />
        <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} />
      </Stack.Navigator>
    </SearchItemContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default ShopNavigator;
