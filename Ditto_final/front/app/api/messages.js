import client from "./client";

const get = (authToken) =>
  client.get("/messages", {}, { headers: { "x-auth-token": authToken } });

const discard = (id) => client.delete(`/messages/${id}`);

export default {
  get,
  discard,
};
