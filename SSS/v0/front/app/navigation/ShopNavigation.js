import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingScreen from "../screens/ShoppingScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";

const Stack = createStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Shoppings" component={ShoppingScreen} />
    <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
