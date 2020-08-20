import client from "./client";

const getStoresInNeed = () => client.get("/storesInNeed");

export default {
  getStoresInNeed,
};
