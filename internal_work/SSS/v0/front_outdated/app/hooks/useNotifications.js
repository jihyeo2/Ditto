import { useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerforPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerforPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      console.log("Error getting a push token", token);
    }
  };
};

// (notification) => {
//     navigation.navigate("Account");
//   }
