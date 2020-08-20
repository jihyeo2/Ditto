import client from "./client";

const getStores = (categoryId) => client.get(`/categories/${categoryId}`);

export default {
  getStores,
};
