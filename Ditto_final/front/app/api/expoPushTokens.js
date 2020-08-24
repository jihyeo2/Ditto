import client from "./client";

const register = (pushToken, authToken) =>
  client.post(
    "./expoPushTokens",
    { token: pushToken },
    { headers: { "x-auth-token": authToken } }
  );

export default {
  register,
};
