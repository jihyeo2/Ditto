import client from "./client";

const getStoresById = (id) => client.get(`/stores/${id}`);
const getStoresByKeyword = (keyword) => client.get(`/stores/search/${keyword}`);
const addStores = (authToken, store, onUploadProgress) => {
  const data = new FormData();
  data.append("name", store.name);
  data.append("categoryId", store.category._id);
  data.append("location", store.location);
  data.append("contact", store.contact);
  data.append("openingHours", store.openingHours);
  data.append("description", store.description);
  data.append("backgroundImage", store.backgroundImage);
  data.append("mainImage", store.mainImage);
  data.append("keyword", store.keyword);

  console.log("data at the end", data);

  return client.post("/stores", data, {
    headers: { "x-auth-token": authToken },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
const editStores = (authToken, store, onUploadProgress) => {
  const data = new FormData();
  data.append("name", store.name);
  data.append("categoryId", store.category._id);
  data.append("location", store.location);
  data.append("contact", store.contact);
  data.append("openingHours", store.openingHours);
  data.append("description", store.description);
  data.append("backgroundImage", store.backgroundImage);
  data.append("mainImage", store.mainImage);
  data.append("keyword", store.keyword);

  console.log("data at the end", data);

  return client.put(`/stores/${store._id}`, data, {
    headers: { "x-auth-token": authToken },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export default {
  getStoresById,
  getStoresByKeyword,
  addStores,
  editStores,
};
