import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AppLoading } from "expo";
import { createStackNavigator } from "@react-navigation/stack";

import navigationTheme from "./app/navigation/navigationTheme";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import AuthNavigator from "./app/navigation/AuthNavigator";
import GrandNavigator from "./app/navigation/GrandNavigator";

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <GrandNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
