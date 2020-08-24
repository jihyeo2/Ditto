import { useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import expoPushTokensApi from "../api/expoPushTokens";
import authStorage from "../auth/storage";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerforPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerforPushNotifications = async () => {
    try {
      console.log("asked for permission");
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log("token", token);
      const authToken = authStorage.getToken();
      expoPushTokensApi.register(token, authToken);
    } catch (error) {
      console.log("Error getting a push token", token);
    }
  };
};
