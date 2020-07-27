import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import ShopNavigator from "./app/navigation/ShopNavigation";

function App() {
  return (
    <NavigationContainer>
      <ShopNavigator />
    </NavigationContainer>
  );
}

export default App;
