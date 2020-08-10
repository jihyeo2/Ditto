import client from "./client";

const show = (authToken) =>
  client.get("/users/me", {}, { headers: { "x-auth-token": authToken } });

export default { show };
