import client from "./client";

const getStoresById = (id) => client.get(`/stores/${id}`);
const getStoresByKeyword = (keyword) => client.get(`/stores/search/${keyword}`);
const addStores = (authToken, store, onUploadProgress) => {
  return client.post("/stores", store, {
    headers: { "x-auth-token": authToken },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
const editStores = (authToken, store, onUploadProgress) => {
  return client.put(`/stores/${store._id}`, store, {
    headers: { "x-auth-token": authToken },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
const deleteStores = (authToken, id) =>
  client.delete(
    `/stores/${id}`,
    {},
    { headers: { "x-auth-token": authToken } }
  );

export default {
  getStoresById,
  getStoresByKeyword,
  addStores,
  editStores,
  deleteStores,
};
