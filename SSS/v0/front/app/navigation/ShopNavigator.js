import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingScreen from "../screens/ShoppingScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import CategoryShoppingScreen from "../screens/CategoryShoppingScreen";
import Header from "../components/Header";

const Stack = createStackNavigator();
const ShopNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
    }}
    screenOptions={({ navigation }) => ({
      headerTitle: (props) => <Header {...props} navigation={navigation} />,
      headerStatusBarHeight: 30,
      headerLeft: null,
    })}
  >
    <Stack.Screen
      name="Shoppings"
      component={ShoppingScreen}
      options={({ navigation }) => ({
        headerTitle: (props) => <Header {...props} navigation={navigation} />,
        headerStatusBarHeight: 30,
      })}
    />
    <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
    <Stack.Screen name="CategoryShopping" component={CategoryShoppingScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default ShopNavigator;
