import client from "./client";

const show = (authToken) =>
  client.get("/users/me", {}, { headers: { "x-auth-token": authToken } });
const register = (userInfo) => {
  console.log("registery");
  const data = new FormData();
  data.append("name", userInfo.name);
  data.append("email", userInfo.email);
  data.append("password", userInfo.password);

  let index = 0;
  data.append("images", {
    name: "image" + index,
    type: "image/jpeg",
    uri: userInfo.profileImage,
  });
  console.log(data);

  client.post("/users", data);
};
const edit = (authToken, userInfo, onUploadProgress) =>
  client.put("/users/me", userInfo, {
    headers: { "x-auth-token": authToken },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
const remove = (authToken) => {
  console.log(authToken);
  client.delete("/users/me", {}, { headers: { "x-auth-token": authToken } });
  console.log("requested delete");
};

export default { register, show, edit, remove };
