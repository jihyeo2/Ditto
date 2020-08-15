import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "../navigation/AuthNavigator";
import AppNavigator from "../navigation/AppNavigator";
import AuthContext from "../auth/context";

function GrandNavigator(props) {
  const { user } = useContext(AuthContext);
  const Stack = createStackNavigator();
  const GrandNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name="Main" component={AppNavigator} />
      ) : (
        <Stack.Screen name="LoginRegister1" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
  return <GrandNavigator />;
}

export default GrandNavigator;
