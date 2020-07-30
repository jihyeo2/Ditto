import client from "./client";

const getStores = (word) =>
  client.get("/stores", { params: { keyword: word } });

export default {
  getStores,
};
