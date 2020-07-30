import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ShopNavigator from "./ShopNavigator";
import AccountNavigator from "./AccountNavigator";
import useNotifications from "../hooks/useNotifications";
import SearchItemContext from "../components/SearchItemContext";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  useNotifications();
  const [searchItem, setSearchItem] = useState();

  return (
    <SearchItemContext.Provider value={{ searchItem, setSearchItem }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Shopping"
          component={ShopNavigator}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="store" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountNavigator}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SearchItemContext.Provider>
  );
};
export default AppNavigator;
