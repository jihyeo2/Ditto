import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import userInfoApi from "../api/userInfo";
import testingApi from "../api/test";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    const { data } = await userInfoApi.show(authToken);
    console.log("userdata", data);
    setUser(data);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
