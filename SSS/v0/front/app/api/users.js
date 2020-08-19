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

export default { register, show, edit };
