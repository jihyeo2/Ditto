import client from "./client";

const show = (authToken) => {
  client.setHeaders({ "x-auth-token": authToken }).get("/users/me");
};

export default {
  show,
};
