import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import AuthContext from "../auth/context";
import StoresInfoAddScreen from "../screens/StoresInfoAddScreen";
import StoresMenuAddScreen from "../screens/StoresMenuAddScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import StoreMainScreen from "../screens/StoreMainScreen";
import AccountEditScreen from "../screens/AccountEditScreen";
import StoresInNeedScreen from "../screens/StoresInNeedScreen";
import MessagesScreen from "../screens/MessagesScreen";

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
      <Stack.Screen name="AccountEdit" component={AccountEditScreen} />
      <Stack.Screen name="StoresInNeed" component={StoresInNeedScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="StoresInfoAdd" component={StoresInfoAddScreen} />
      <Stack.Screen name="StoresMenuAdd" component={StoresMenuAddScreen} />
      <Stack.Screen name="StoreMain" component={StoreMainScreen} />
    </Stack.Navigator>
  );
  return <AccountNavigator />;
}

export default AccountNavigator;
