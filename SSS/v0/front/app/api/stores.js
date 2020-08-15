import client from "./client";

const getStores = (keyword) => client.get(`/stores/search/${keyword}`);
const addStores = (store) => {
  const data = new FormData();
  data.append("name", store.basicInfo.name);
  data.append("userId", store.user._id);
  data.append("categoryId", store.basicInfo.category._id);
  data.append("location", store.basicInfo.location);
  data.append("contact", store.basicInfo.contact);
  data.append("openingHours", store.basicInfo.openingHours);
  data.append("description", store.basicInfo.description);
  data.append("backgroundImage", store.basicInfo.backgroundImage);
  data.append("mainImage", store.basicInfo.mainImage);
  data.append("keyword", store.keyword);

  console.log("data at the end", data);

  return client.post("/stores", data);
};
export default {
  getStores,
  addStores,
};
