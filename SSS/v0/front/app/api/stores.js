import client from "./client";

const getStores = (keyword) => client.get(`/stores/search/${keyword}`);

export default {
  getStores,
};
