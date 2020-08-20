import client from "./client";

const getCategories = () => client.get("/categories");

export default {
  getCategories,
};
