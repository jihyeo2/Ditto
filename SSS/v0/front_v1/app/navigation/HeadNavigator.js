import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import AuthContext from "../auth/context";

function HeadNavigator(props) {
  const { user } = useContext(AuthContext);
  const Stack = createStackNavigator();
  const HeadNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
  return <HeadNavigator />;
}

export default HeadNavigator;
