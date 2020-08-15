import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import AccountScreen from "../screens/AccountScreen";
import AuthNavigator from "../navigation/AuthNavigator";
import AuthContext from "../auth/context";
import StoresInfoEditScreen from "../screens/StoresInfoEditScreen";
import StoresMenuEditScreen from "../screens/StoresMenuEditScreen";

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
        <>
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
        </>
      ) : (
        <Stack.Screen name="LoginRegister2" component={AuthNavigator} />
      )}
      <Stack.Screen name="StoresInfoEdit" component={StoresInfoEditScreen} />
      <Stack.Screen name="StoresMenuEdit" component={StoresMenuEditScreen} />
    </Stack.Navigator>
  );
  return <AccountNavigator />;
}

export default AccountNavigator;
