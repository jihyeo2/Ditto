import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import AccountScreen from "../screens/AccountScreen";
import AuthNavigator from "../navigation/AuthNavigator";
import AuthContext from "../auth/context";
import StoresInfoEditScreen from "../screens/StoresInfoEditScreen";
import StoresMenuEditScreen from "../screens/StoresMenuEditScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

function AccountNavigator(props) {
  const { user } = useContext(AuthContext);
  const Stack = createStackNavigator();
  const AccountNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name="MyAccount" component={AccountScreen} />
      ) : (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      )}
      <Stack.Screen name="StoresInfoEdit" component={StoresInfoEditScreen} />
      <Stack.Screen name="StoresMenuEdit" component={StoresMenuEditScreen} />
    </Stack.Navigator>
  );
  return <AccountNavigator />;
}

export default AccountNavigator;
