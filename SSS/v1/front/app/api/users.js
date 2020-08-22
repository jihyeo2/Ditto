import client from "./client";

const show = (authToken) =>
  client.get("/users/me", {}, { headers: { "x-auth-token": authToken } });
const register = (userInfo) => client.post("/users", userInfo);
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
