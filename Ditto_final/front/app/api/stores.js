import client from "./client";

const getStoresById = (id) => client.get(`/stores/${id}`);
const getStoresByKeyword = (keyword) => client.get(`/stores/search/${keyword}`);
const addStores = (authToken, store, onUploadProgress) => {
  const data = new FormData();
  data.append("name", store.name);
  data.append("category", store.category._id);
  data.append("description", store.description);
  data.append("delivery", store.delivery);
  data.append("location", store.location);
  data.append("contact", store.contact);
  data.append("openingHours", store.openingHours);

  let index = 0;
  data.append("images", {
    name: "image" + index,
    type: "image/jpeg",
    uri: store.mainImage,
  });
  index = index + 1;
  data.append("images", {
    name: "image" + index,
    type: "image/jpeg",
    uri: store.backgroundImage,
  });
  index = index + 1;

  store.menuImages.forEach((image, index) =>
    data.append("images", {
      name: "image" + (index + 2),
      type: "image/jpeg",
      uri: image,
    })
  );

  let menuName = [];
  let menuPrice = [];
  store.menus.forEach((menu) => {
    menuName.push(menu.name);
    menuPrice.push(menu.price);
  });

  data.append(`menuNames`, JSON.stringify(menuName));
  data.append(`menuPrices`, JSON.stringify(menuPrice));

  console.log("this is the one you are looking for", data);
  return client.post("/stores", data, {
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
