import client from "./client";

const show = (authToken) =>
  client.get("/users/me", {}, { headers: { "x-auth-token": authToken } });
const register = (userInfo) => client.post("/users", userInfo);
const edit = (authToken, userInfo) =>
  client.put("/users/me", userInfo, { headers: { "x-auth-token": authToken } });

export default { register, show, edit };
